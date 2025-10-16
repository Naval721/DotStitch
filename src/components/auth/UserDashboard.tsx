import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useAuth } from '@/hooks/useAuth'
import { PointsPurchase } from '@/components/points/PointsPurchase'
import { 
  User, 
  Crown, 
  Download, 
  Calendar, 
  Settings, 
  LogOut, 
  Sparkles,
  Shield,
  Zap,
  CheckCircle,
  XCircle,
  ShoppingCart,
  TrendingUp,
  Gift
} from 'lucide-react'
import { toast } from 'sonner'
import { formatPoints, formatCurrency, calculateExportsPossible } from '@/types/points'

interface UserDashboardProps {
  onClose: () => void
}

export const UserDashboard = ({ onClose }: UserDashboardProps) => {
  const { user, profile, signOut, updateProfile } = useAuth()
  const [loading, setLoading] = useState(false)
  const [showPurchaseDialog, setShowPurchaseDialog] = useState(false)

  const handleSignOut = async () => {
    setLoading(true)
    await signOut()
    onClose()
    setLoading(false)
  }

  const currentPoints = profile?.points_balance || 0
  const totalPurchased = profile?.total_points_purchased || 0
  const totalUsed = profile?.total_points_used || 0

  const exportsPossible = calculateExportsPossible(currentPoints)

  const handlePurchasePoints = async (packageId: string) => {
    // This will be handled by the useAuth hook
    toast.info('Points purchase coming soon!')
  }

  if (!profile) return null

  return (
    <div className="space-y-6">
      {/* User Info Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg">{profile.full_name || 'User'}</CardTitle>
                <CardDescription>{profile.email}</CardDescription>
              </div>
            </div>
            <Badge className="bg-blue-100 text-blue-800">
              <div className="flex items-center space-x-1">
                <Sparkles className="w-4 h-4" />
                <span>{formatPoints(currentPoints)} points</span>
              </div>
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Free Trial Banner */}
      {currentPoints === 5 && (
        <Alert className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-300">
          <Gift className="h-5 w-5 text-green-600" />
          <AlertDescription>
            <p className="font-semibold text-green-900 mb-1">🎉 Free Trial Active!</p>
            <p className="text-green-700 text-sm">
              You have 5 free exports to try our platform. Buy more points to continue after your trial!
            </p>
          </AlertDescription>
        </Alert>
      )}

      {/* Points Balance */}
      <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <span>Points Balance</span>
            {currentPoints === 5 && (
              <Badge className="ml-2 bg-green-100 text-green-800">
                <Gift className="w-3 h-3 mr-1" />
                Free Trial
              </Badge>
            )}
          </CardTitle>
          <CardDescription>
            Your current points and usage statistics
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <p className="text-sm text-gray-600 mb-2">Available Points</p>
            <p className="text-5xl font-bold text-blue-600">{formatPoints(currentPoints)}</p>
            {currentPoints === 5 && (
              <p className="text-xs text-green-600 mt-2">✨ Free trial - 5 free exports</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-xs text-gray-600 mb-1">Total Purchased</p>
              <p className="text-xl font-bold text-green-600">{formatPoints(totalPurchased)}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-xs text-gray-600 mb-1">Total Used</p>
              <p className="text-xl font-bold text-orange-600">{formatPoints(totalUsed)}</p>
            </div>
          </div>

          <Button 
            onClick={() => setShowPurchaseDialog(true)}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Buy More Points
          </Button>
        </CardContent>
      </Card>

      {/* What You Can Export */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5" />
            <span>What You Can Export</span>
          </CardTitle>
          <CardDescription>
            Based on your current points balance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Front Images</p>
              <p className="text-2xl font-bold text-blue-600">{exportsPossible.frontOnly}</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Back Images</p>
              <p className="text-2xl font-bold text-purple-600">{exportsPossible.backOnly}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Full Jerseys</p>
              <p className="text-2xl font-bold text-green-600">{exportsPossible.fullJersey}</p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">With Collar</p>
              <p className="text-2xl font-bold text-orange-600">{exportsPossible.fullJerseyWithCollar}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Point Costs Info */}
      <Card>
        <CardHeader>
          <CardTitle>Point Costs</CardTitle>
          <CardDescription>How many points each export costs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <span className="text-sm">Front Image</span>
              <Badge variant="outline" className="font-bold">1 point</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <span className="text-sm">Back Image</span>
              <Badge variant="outline" className="font-bold">2 points</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span className="text-sm">Per Sleeve</span>
              <Badge variant="outline" className="font-bold">1 point</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
              <span className="text-sm">Collar</span>
              <Badge variant="outline" className="font-bold">1 point</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg border-2 border-blue-300">
              <span className="text-sm font-semibold">Full Jersey (F+B+2S)</span>
              <Badge className="bg-blue-600 font-bold">4 points</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg border-2 border-purple-300">
              <span className="text-sm font-semibold">Full Jersey with Collar</span>
              <Badge className="bg-purple-600 font-bold">5 points</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Features */}
      <Card>
        <CardHeader>
          <CardTitle>Your Features</CardTitle>
          <CardDescription>All features available with points</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">High-Quality Exports (300 DPI)</span>
              <CheckCircle className="w-4 h-4 text-green-600" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Individual Sleeve Export</span>
              <CheckCircle className="w-4 h-4 text-green-600" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Secure Cloud Storage</span>
              <CheckCircle className="w-4 h-4 text-green-600" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">No Watermarks</span>
              <CheckCircle className="w-4 h-4 text-green-600" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Points Never Expire</span>
              <CheckCircle className="w-4 h-4 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Actions */}
      <div className="space-y-3">
        <Button 
          variant="outline" 
          className="w-full justify-start"
          onClick={() => toast.info('Settings coming soon!')}
        >
          <Settings className="w-4 h-4 mr-2" />
          Account Settings
        </Button>
        
        <Button 
          variant="outline" 
          className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
          onClick={handleSignOut}
          disabled={loading}
        >
          <LogOut className="w-4 h-4 mr-2" />
          {loading ? 'Signing out...' : 'Sign Out'}
        </Button>
      </div>

      {/* Points Purchase Dialog */}
      <PointsPurchase
        isOpen={showPurchaseDialog}
        onClose={() => setShowPurchaseDialog(false)}
        onPurchase={handlePurchasePoints}
        currentPoints={currentPoints}
      />
    </div>
  )
}
