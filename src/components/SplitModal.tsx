import React, { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { DollarSign, Users, Calculator, Loader2, Upload, CheckCircle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { useAccount } from 'wagmi'
import { splitStorageService, type SplitData, type SplitMember } from '@/services/splitStorageService'

interface Group {
  id: string
  name: string
  hash: string
  members: string[]
  createdAt: Date
}

interface SplitModalProps {
  isOpen: boolean
  onClose: () => void
  group: Group | null
  onCreateSplit: (splitData: SplitData) => void
}

interface MemberAmount {
  name: string
  amount: number
}

const SplitModal: React.FC<SplitModalProps> = ({ 
  isOpen, 
  onClose, 
  group, 
  onCreateSplit 
}) => {
  const { address } = useAccount()
  const [groupName, setGroupName] = useState('')
  const [totalAmount, setTotalAmount] = useState('')
  const [memberAmounts, setMemberAmounts] = useState<MemberAmount[]>([])
  const [isEqualSplit, setIsEqualSplit] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle')
  const [ipfsHash, setIpfsHash] = useState<string>('')

  useEffect(() => {
    if (group) {
      setGroupName(group.name)
      const initialAmounts = group.members.map(member => ({
        name: member,
        amount: 0
      }))
      setMemberAmounts(initialAmounts)
    }
  }, [group])

  useEffect(() => {
    if (isEqualSplit && totalAmount && memberAmounts.length > 0) {
      const total = parseFloat(totalAmount) || 0
      const splitAmount = total / memberAmounts.length
      const updatedAmounts = memberAmounts.map(member => ({
        ...member,
        amount: Math.round(splitAmount * 100) / 100 // Round to 2 decimal places
      }))
      setMemberAmounts(updatedAmounts)
    }
  }, [isEqualSplit, totalAmount, memberAmounts.length])

  const handleMemberAmountChange = (memberName: string, amount: string) => {
    const updatedAmounts = memberAmounts.map(member =>
      member.name === memberName 
        ? { ...member, amount: parseFloat(amount) || 0 }
        : member
    )
    setMemberAmounts(updatedAmounts)
  }

  const totalAssigned = memberAmounts.reduce((sum, member) => sum + member.amount, 0)
  const isValid = groupName && totalAmount && totalAssigned > 0

  const handleCreateSplit = async () => {
    if (!isValid || !group || !address) return

    setIsLoading(true)
    setUploadStatus('uploading')

    try {
      // Create split members data
      const splitMembers: SplitMember[] = memberAmounts.map((member, index) => ({
        id: `member-${index}`,
        name: member.name,
        walletId: group.members[index] || member.name, // Use actual wallet ID if available
        amount: member.amount,
        isPaid: false // Initially no one has paid
      }))

      // Create comprehensive split data
      const splitData: SplitData = {
        id: `split-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        groupId: group.id,
        groupName,
        description: `Bill split for ${groupName}`,
        totalAmount: parseFloat(totalAmount),
        paidBy: address, // Current user is the one creating/paying
        paidByName: 'You', // Could be enhanced with actual user name
        members: splitMembers,
        createdAt: new Date().toISOString(),
        createdBy: address,
        splitType: isEqualSplit ? 'equal' : 'custom',
        currency: 'USD',
        isSettled: false
      }

      console.log('🔄 Creating split and uploading to Filecoin...', {
        splitId: splitData.id,
        totalAmount: splitData.totalAmount,
        membersCount: splitData.members.length
      })

      // Upload to Filecoin
      const uploadResult = await splitStorageService.uploadSplitData(splitData)

      if (uploadResult.success && uploadResult.hash) {
        setUploadStatus('success')
        setIpfsHash(uploadResult.hash)
        
        // Store hash locally
        splitStorageService.storeSplitHash(address, splitData.id, uploadResult.hash)
        
        console.log('✅ Split uploaded to Filecoin successfully!', {
          hash: uploadResult.hash,
          splitId: splitData.id
        })

        // Wait a moment to show success, then callback
        setTimeout(() => {
          onCreateSplit(splitData)
          setIsLoading(false)
          handleClose()
        }, 2000)
        
      } else {
        throw new Error(uploadResult.error || 'Upload failed')
      }

    } catch (error: any) {
      console.error('❌ Error creating split:', error)
      setUploadStatus('error')
      
      // Still create the split locally even if upload fails
      setTimeout(() => {
        const fallbackSplitData: SplitData = {
          id: `split-${Date.now()}`,
          groupId: group.id,
          groupName,
          description: `Bill split for ${groupName}`,
          totalAmount: parseFloat(totalAmount),
          paidBy: address,
          paidByName: 'You',
          members: memberAmounts.map((member, index) => ({
            id: `member-${index}`,
            name: member.name,
            walletId: group.members[index] || member.name,
            amount: member.amount,
            isPaid: false
          })),
          createdAt: new Date().toISOString(),
          createdBy: address,
          splitType: isEqualSplit ? 'equal' : 'custom',
          currency: 'USD',
          isSettled: false
        }
        
        onCreateSplit(fallbackSplitData)
        setIsLoading(false)
        handleClose()
      }, 2000)
    }
  }

  const handleClose = () => {
    setGroupName('')
    setTotalAmount('')
    setMemberAmounts([])
    setIsEqualSplit(true)
    setIsLoading(false)
    onClose()
  }

  if (!group) return null

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md glass">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Calculator className="h-5 w-5" />
            <span>Create Bill Split</span>
          </DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            {uploadStatus === 'uploading' && (
              <>
                <Upload className="h-12 w-12 animate-pulse text-blue-500 mb-4" />
                <h3 className="text-lg font-medium mb-2">Uploading to Filecoin</h3>
                <p className="text-muted-foreground text-center">
                  Storing your split data permanently on IPFS...
                </p>
              </>
            )}
            
            {uploadStatus === 'success' && (
              <>
                <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
                <h3 className="text-lg font-medium mb-2">Split Created Successfully!</h3>
                <p className="text-muted-foreground text-center mb-2">
                  Your split has been stored on Filecoin
                </p>
                {ipfsHash && (
                  <div className="text-xs font-mono bg-muted px-2 py-1 rounded">
                    IPFS: {ipfsHash.substring(0, 12)}...{ipfsHash.substring(-8)}
                  </div>
                )}
              </>
            )}
            
            {uploadStatus === 'error' && (
              <>
                <Loader2 className="h-12 w-12 animate-spin text-orange-500 mb-4" />
                <h3 className="text-lg font-medium mb-2">Creating Split Locally</h3>
                <p className="text-muted-foreground text-center">
                  Upload failed, but split will be saved locally...
                </p>
              </>
            )}
            
            {uploadStatus === 'idle' && (
              <>
                <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                <h3 className="text-lg font-medium mb-2">Preparing Split</h3>
                <p className="text-muted-foreground text-center">
                  Setting up your bill split...
                </p>
              </>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {/* Group Info */}
            <div className="p-3 rounded-lg bg-muted/30">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{group.name}</span>
                <Badge variant="outline" className="font-mono text-xs">
                  {group.hash}
                </Badge>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Users className="h-3 w-3" />
                <span>{group.members.length} members</span>
              </div>
            </div>

            {/* Group Name Input */}
            <div className="space-y-2">
              <Label htmlFor="groupName">Split Name</Label>
              <Input
                id="groupName"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                placeholder="e.g., Dinner at restaurant"
              />
            </div>

            {/* Total Amount */}
            <div className="space-y-2">
              <Label htmlFor="totalAmount">Total Amount</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="totalAmount"
                  type="number"
                  step="0.01"
                  value={totalAmount}
                  onChange={(e) => setTotalAmount(e.target.value)}
                  placeholder="0.00"
                  className="pl-10"
                />
              </div>
            </div>

            {/* Equal Split Toggle */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Equal Split</Label>
                <p className="text-sm text-muted-foreground">
                  Split amount equally among all members
                </p>
              </div>
              <Switch
                checked={isEqualSplit}
                onCheckedChange={setIsEqualSplit}
              />
            </div>

            <Separator />

            {/* Member Amounts */}
            <div className="space-y-3">
              <Label>Amount per Member</Label>
              {memberAmounts.map((member) => (
                <div key={member.name} className="flex items-center space-x-3">
                  <span className="font-medium min-w-0 flex-1">{member.name}</span>
                  <div className="relative w-24">
                    <DollarSign className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-muted-foreground" />
                    <Input
                      type="number"
                      step="0.01"
                      value={member.amount}
                      onChange={(e) => handleMemberAmountChange(member.name, e.target.value)}
                      disabled={isEqualSplit}
                      className="pl-7 text-sm"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Total Check */}
            <div className="p-3 rounded-lg bg-muted/30">
              <div className="flex justify-between text-sm">
                <span>Total Amount:</span>
                <span>${totalAmount || '0.00'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Assigned:</span>
                <span className={totalAssigned === parseFloat(totalAmount || '0') ? 'text-green-400' : 'text-orange-400'}>
                  ${totalAssigned.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <Button
                onClick={handleCreateSplit}
                disabled={!isValid}
                className="flex-1 bg-gradient-to-r from-primary to-accent"
              >
                Create Split
              </Button>
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default SplitModal
