import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { ChevronUp, ChevronDown, Plus, Users } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface Friend {
  id: string
  name: string
  walletId: string
  isSelected: boolean
}

interface FriendsSectionProps {
  friends: Friend[]
  onFriendsUpdate: (friends: Friend[]) => void
  onGroupCreate: (selectedFriends: Friend[]) => void
}

const FriendsSection: React.FC<FriendsSectionProps> = ({ 
  friends, 
  onFriendsUpdate, 
  onGroupCreate 
}) => {
  const [isAddFriendOpen, setIsAddFriendOpen] = useState(false)
  const [newFriend, setNewFriend] = useState({ name: '', walletId: '' })

  const handleAddFriend = () => {
    if (newFriend.name && newFriend.walletId) {
      const friend: Friend = {
        id: Date.now().toString(),
        name: newFriend.name,
        walletId: newFriend.walletId,
        isSelected: false
      }
      onFriendsUpdate([...friends, friend])
      setNewFriend({ name: '', walletId: '' })
      setIsAddFriendOpen(false)
    }
  }

  const handleFriendSelection = (friendId: string, checked: boolean) => {
    const updatedFriends = friends.map(friend =>
      friend.id === friendId ? { ...friend, isSelected: checked } : friend
    )
    onFriendsUpdate(updatedFriends)
  }

  const selectedFriends = friends.filter(friend => friend.isSelected)

  const handleCreateGroup = () => {
    if (selectedFriends.length > 0) {
      onGroupCreate(selectedFriends)
      // Deselect all friends after group creation
      const updatedFriends = friends.map(friend => ({ ...friend, isSelected: false }))
      onFriendsUpdate(updatedFriends)
    }
  }

  const handleCancelSelection = () => {
    const updatedFriends = friends.map(friend => ({ ...friend, isSelected: false }))
    onFriendsUpdate(updatedFriends)
  }

  return (
    <div className="h-full flex flex-col">
      {/* Friends List Header */}
      <Card className="glass flex-1 flex flex-col min-h-0">
        <CardHeader className="flex-shrink-0 pb-4">
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>Friends</span>
            <Badge variant="outline">{friends.length}</Badge>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col min-h-0 p-4 pt-0">
          {/* Friends List - Scrollable Container */}
          <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden scrollbar-thin smooth-scroll">
            <div className="space-y-3 pr-3 pb-2">
            {friends.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">
                No friends added yet. Add your first friend below!
              </p>
            ) : (
              friends.map((friend) => (
                <div 
                  key={friend.id} 
                  className="flex items-center space-x-3 p-4 rounded-lg border border-border/20 hover:bg-muted/30 transition-colors"
                >
                  <Checkbox
                    checked={friend.isSelected}
                    onCheckedChange={(checked) => 
                      handleFriendSelection(friend.id, checked as boolean)
                    }
                  />
                  <div className="flex-1">
                    <p className="font-medium">{friend.name}</p>
                    <p className="text-sm text-muted-foreground font-mono">
                      {friend.walletId.length > 10 
                        ? `${friend.walletId.slice(0, 6)}...${friend.walletId.slice(-4)}`
                        : friend.walletId
                      }
                    </p>
                  </div>
                </div>
              ))
            )}
            </div>
          </div>

          {/* Group Action Buttons */}
          {selectedFriends.length > 0 && (
            <div className="flex-shrink-0 flex space-x-2 pt-4 border-t border-border/20 mt-4">
              <Button 
                onClick={handleCreateGroup}
                className="flex-1 bg-gradient-to-r from-primary to-accent"
              >
                <Users className="mr-2 h-4 w-4" />
                Form Group ({selectedFriends.length})
              </Button>
              <Button 
                variant="outline" 
                onClick={handleCancelSelection}
              >
                Cancel
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Friend Section */}
      <div className="mt-6">
        <div className="relative">
          <Button
            variant="outline"
            onClick={() => setIsAddFriendOpen(!isAddFriendOpen)}
            className="w-full flex items-center justify-center space-x-2 py-3"
          >
            <Plus className="h-4 w-4" />
            <span>Add Friend</span>
            {isAddFriendOpen ? 
              <ChevronDown className="h-4 w-4" /> : 
              <ChevronUp className="h-4 w-4" />
            }
          </Button>

          {isAddFriendOpen && (
            <Card className="mt-2 glass">
              <CardContent className="p-4 space-y-3">
                <Input
                  placeholder="Friend's name"
                  value={newFriend.name}
                  onChange={(e) => setNewFriend({...newFriend, name: e.target.value})}
                />
                <Input
                  placeholder="Wallet ID or ENS"
                  value={newFriend.walletId}
                  onChange={(e) => setNewFriend({...newFriend, walletId: e.target.value})}
                />
                <div className="flex space-x-2">
                  <Button 
                    onClick={handleAddFriend}
                    disabled={!newFriend.name || !newFriend.walletId}
                    className="flex-1"
                  >
                    Save
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setIsAddFriendOpen(false)
                      setNewFriend({ name: '', walletId: '' })
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

export default FriendsSection
