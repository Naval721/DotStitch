import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/hooks/useAuth'
import { AuthModal } from './AuthModal'
import { UserDashboard } from './UserDashboard'
import { 
  Crown, 
  Lock, 
  Star, 
  Rocket, 
  Lock as LockIcon, 
  Download,
  CheckCircle,
  Sparkles,
  Users,
  Award,
  ShoppingCart
} from 'lucide-react'
import { useState } from 'react'

interface PremiumGateProps {
  children: React.ReactNode
  feature: string
  description?: string
}

export const PremiumGate = ({ children, feature, description }: PremiumGateProps) => {
  const { user, profile, hasEnoughPoints, currentPoints } = useAuth()
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [showUserDashboard, setShowUserDashboard] = useState(false)

  // If user has points, show the content
  if (user && hasEnoughPoints) {
    return <>{children}</>
  }

  // If user is logged in but has no points
  if (user && !hasEnoughPoints) {
    return (
      <Card className="border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center mb-4">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl text-amber-900">
            Insufficient Points
          </CardTitle>
          <CardDescription className="text-amber-700">
            You need points to export your designs. Buy points to continue.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Current Points */}
          {profile && (
            <div className="bg-white/50 p-4 rounded-lg border border-amber-200">
              <div className="flex items-center justify-between text-sm">
                <span className="text-amber-800">Current points:</span>
                <span className="font-semibold text-amber-900">
                  {currentPoints} points
                </span>
              </div>
            </div>
          )}

          {/* Point Costs */}
          <div className="space-y-4">
            <h3 className="font-semibold text-amber-900 text-center">Point Costs</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center space-x-2 text-sm">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Front: 1 point</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Back: 2 points</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Sleeve: 1 point</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Collar: 1 point</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button 
              onClick={() => setShowUserDashboard(true)}
              className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Buy Points
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => setShowUserDashboard(true)}
              className="w-full border-amber-300 text-amber-700 hover:bg-amber-50"
            >
              <Users className="w-4 h-4 mr-2" />
              View Account
            </Button>
          </div>
        </CardContent>

        <UserDashboard 
          isOpen={showUserDashboard} 
          onClose={() => setShowUserDashboard(false)} 
        />
      </Card>
    )
  }

  // If user is not logged in
  return (
    <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-purple-50">
      <CardHeader className="text-center">
        <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mb-4">
          <Lock className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-2xl text-blue-900">
          Sign In Required
        </CardTitle>
        <CardDescription className="text-blue-700">
          {description || `Access ${feature} and unlock premium features`}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Features Preview */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="space-y-2">
            <div className="mx-auto w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <Star className="w-4 h-4 text-blue-600" />
            </div>
            <p className="text-xs text-blue-700">Premium Quality</p>
          </div>
          <div className="space-y-2">
            <div className="mx-auto w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <LockIcon className="w-4 h-4 text-green-600" />
            </div>
            <p className="text-xs text-green-700">Secure</p>
          </div>
          <div className="space-y-2">
            <div className="mx-auto w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <Rocket className="w-4 h-4 text-purple-600" />
            </div>
            <p className="text-xs text-purple-700">Fast Export</p>
          </div>
        </div>

        {/* Benefits */}
        <div className="space-y-3">
          <h3 className="font-semibold text-blue-900 text-center">What you get:</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>5 free exports to start</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>300 DPI professional quality</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>Individual sleeve exports</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>Secure cloud storage</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button 
            onClick={() => setShowAuthModal(true)}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <Star className="w-4 h-4 mr-2" />
            Sign In / Sign Up
          </Button>
          
          <div className="text-center">
            <p className="text-xs text-blue-600">
              Join thousands of designers creating amazing jerseys
            </p>
          </div>
        </div>
      </CardContent>

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </Card>
  )
}
