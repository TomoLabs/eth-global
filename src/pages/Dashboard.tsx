import React, { useState } from 'react'
import DashboardLayout from '@/layouts/DashboardLayout'
import FriendsSection from '@/components/FriendsSection'
import SplitModal from '@/components/SplitModal'

interface Friend {
  id: string
  walletId: string
  resolvedAddress?: string // For ENS names, store the resolved address
  resolvedENS?: string // For addresses, store the resolved ENS name
  isENS?: boolean
  isSelected: boolean
}

interface Group {
  id: string
  name: string
  hash: string
  members: string[]
  createdAt: Date
}

const Dashboard: React.FC = () => {

  // Dummy data for friends and groups (more data to test scrolling)
  const [friends, setFriends] = useState<Friend[]>([
    {
      id: '1',
      walletId: '0x742d35Cc6635C8532FD6bD8c',
      isSelected: false
    },
    {
      id: '2',
      walletId: 'vitalik.eth',
      isENS: true,
      isSelected: false
    },
    {
      id: '3',
      walletId: '0x1234567890123456789012345',
      isSelected: false
    }
  ])

  const [groups, setGroups] = useState<Group[]>([
    {
      id: '1',
      name: 'Dinner Squad',
      hash: '0xabcd1234...',
      members: ['Alice Cooper', 'Bob Smith'],
      createdAt: new Date('2024-01-15')
    },
    {
      id: '2',
      name: 'Weekend Trip',
      hash: '0xefgh5678...',
      members: ['Alice Cooper', 'Charlie Brown'],
      createdAt: new Date('2024-01-20')
    }
  ])

  const [selectedGroupForSplit, setSelectedGroupForSplit] = useState<Group | null>(null)
  const [isSplitModalOpen, setIsSplitModalOpen] = useState(false)

  const mockMetrics = {
    totalEarnings: "1,234.56",
    activeHooks: 3,
    referrals: 42,
    volumeGenerated: "98,765"
  }

  const handleFriendsUpdate = (updatedFriends: Friend[]) => {
    setFriends(updatedFriends)
  }

  const handleGroupCreate = (selectedFriends: Friend[]) => {
    const groupName = `Group ${groups.length + 1}`
    const newGroup: Group = {
      id: Date.now().toString(),
      name: groupName,
      hash: `0x${Math.random().toString(16).substr(2, 8)}...`,
      members: selectedFriends.map(friend => friend.resolvedENS || friend.walletId),
      createdAt: new Date()
    }
    setGroups([...groups, newGroup])
  }

  const handleCreateSplit = (group: Group) => {
    setSelectedGroupForSplit(group)
    setIsSplitModalOpen(true)
  }

  const handleSplitCreated = (splitData: any) => {
    console.log('Split created:', splitData)
    // Here you would typically send this to your backend
  }

  return (
    <DashboardLayout 
      title="Bill Splitting Dashboard"
      description="Split bills with friends and manage group expenses"
    >
      {/* Main Content with Left-Aligned Friends/Groups */}
      <div className="relative h-[calc(100vh-96px)] flex flex-col lg:flex-row">
        {/* Fixed Left Panel - Friends Only */}
        <div className="fixed left-0 top-24 w-80 h-[calc(100vh-96px)] p-4 bg-background/95 backdrop-blur-sm border-r border-border/20 overflow-hidden hidden lg:flex lg:flex-col">
          {/* Friends Section - Full Height */}
          <div className="flex-1 min-h-0">
            <FriendsSection
              friends={friends}
              onFriendsUpdate={handleFriendsUpdate}
              onGroupCreate={handleGroupCreate}
            />
          </div>
        </div>

        {/* Mobile Friends Panel - Collapsible */}
        <div className="lg:hidden">
          <div className="p-4 border-b border-border/20">
            <details className="group">
              <summary className="flex items-center justify-between cursor-pointer list-none">
                <span className="font-medium">Friends & Groups</span>
                <div className="w-5 h-5 transition-transform group-open:rotate-180">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </summary>
              <div className="mt-4 max-h-96 overflow-y-auto">
                <FriendsSection
                  friends={friends}
                  onFriendsUpdate={handleFriendsUpdate}
                  onGroupCreate={handleGroupCreate}
                />
              </div>
            </details>
          </div>
        </div>

        {/* Main Dashboard Content - Right Side */}
        <div className="lg:ml-80 flex-1 h-full flex flex-col">
          {/* Active Groups Buttons */}
          <div className="p-6 pb-4 border-b border-border/20">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-muted-foreground">Active Groups</h3>
              {groups.length > 0 && (
                <div className="text-xs text-muted-foreground bg-muted/30 px-2 py-1 rounded">
                  {groups.length} group{groups.length !== 1 ? 's' : ''} available
                </div>
              )}
            </div>
            {groups.length === 0 ? (
              <div className="text-center py-4">
                <p className="text-muted-foreground text-sm">
                  No groups created yet. Form your first group from the friends panel.
                </p>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {groups.map((group) => (
                  <button
                    key={group.id}
                    onClick={() => handleCreateSplit(group)}
                    className="group relative px-3 py-2 sm:px-4 sm:py-3 rounded-lg bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 hover:border-primary/50 transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-primary/20"
                  >
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <div className="flex items-center space-x-1 sm:space-x-2">
                        <div className="w-2 h-2 rounded-full bg-accent"></div>
                        <span className="font-medium text-xs sm:text-sm">{group.name}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                        <span>{group.members.length}</span>
                        <span>👥</span>
                      </div>
                      <div className="hidden sm:block text-xs text-muted-foreground font-mono">
                        {group.hash}
                      </div>
                    </div>
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                    
                    {/* Tooltip on hover */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-card border border-border rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                      Click to create split • Members: {group.members.join(', ')}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Welcome Content */}
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="text-center space-y-6">
              <h2 className="text-6xl font-bold gradient-text">Welcome!</h2>
              <p className="text-xl text-muted-foreground max-w-md">
                Manage your friends using the left panel and access your groups via the buttons above.
              </p>
              <div className="space-y-4 text-left max-w-md">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-accent"></div>
                  <span>Add friends using wallet addresses or ENS names</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-accent"></div>
                  <span>Select friends to form groups</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-accent"></div>
                  <span>Click group buttons above to create bill splits</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-accent"></div>
                  <span>Enjoy seamless bill splitting with friends</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Split Modal */}
      <SplitModal
        isOpen={isSplitModalOpen}
        onClose={() => setIsSplitModalOpen(false)}
        group={selectedGroupForSplit}
        onCreateSplit={handleSplitCreated}
      />
    </DashboardLayout>
  )
}

export default Dashboard
