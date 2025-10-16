import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  ShoppingCart, 
  CheckCircle, 
  Star, 
  Zap, 
  Crown,
  Sparkles,
  TrendingUp,
  Gift,
  Info
} from 'lucide-react'
import { POINTS_PLANS, calculateTotalPoints, formatPoints, formatCurrency } from '@/types/points'
import { toast } from 'sonner'

interface PointsPurchaseProps {
  isOpen: boolean
  onClose: () => void
  onPurchase: (packageId: string) => Promise<void>
  currentPoints: number
}

export const PointsPurchase = ({ isOpen, onClose, onPurchase, currentPoints }: PointsPurchaseProps) => {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handlePurchase = async (packageId: string) => {
    setLoading(true)
    try {
      await onPurchase(packageId)
      toast.success('Points purchased successfully!')
      onClose()
      setSelectedPackage(null)
    } catch (error) {
      toast.error('Failed to purchase points. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Buy Points
          </DialogTitle>
          <DialogDescription className="text-lg">
            Choose a package to purchase points for exporting your jersey designs
          </DialogDescription>
        </DialogHeader>

        {/* Current Balance */}
        <Alert className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <div className="flex items-center space-x-3">
            <Sparkles className="h-5 w-5 text-blue-600" />
            <div>
              <p className="font-semibold text-blue-900">Current Balance</p>
              <p className="text-2xl font-bold text-blue-600">{formatPoints(currentPoints)} points</p>
            </div>
          </div>
        </Alert>

        {/* Points Packages */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {POINTS_PLANS.map((plan) => {
            const totalPoints = calculateTotalPoints(plan)
            const isEnterprise = plan.id === 'enterprise'
            
            return (
              <Card 
                key={plan.id} 
                className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl ${
                  plan.popular ? 'border-2 border-blue-500 shadow-lg' : 'border-2'
                } ${selectedPackage === plan.id ? 'ring-2 ring-blue-500' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-bl-lg text-sm font-semibold">
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3" />
                      <span>Most Popular</span>
                    </div>
                  </div>
                )}

                <CardHeader className="text-center pb-4">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mb-3">
                    {plan.id === 'basic' && <Zap className="w-8 h-8 text-white" />}
                    {plan.id === 'professional' && <Crown className="w-8 h-8 text-white" />}
                    {plan.id === 'enterprise' && <Sparkles className="w-8 h-8 text-white" />}
                  </div>
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <CardDescription className="text-sm">{plan.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Price */}
                  <div className="text-center">
                    {isEnterprise ? (
                      <div className="space-y-2">
                        <p className="text-3xl font-bold text-gray-900">Custom</p>
                        <p className="text-sm text-gray-600">Contact for pricing</p>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                          {formatCurrency(plan.price)}
                        </p>
                        {plan.bonusPoints && plan.bonusPoints > 0 && (
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            <Gift className="w-3 h-3 mr-1" />
                            +{plan.bonusPoints} bonus points
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Points */}
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-200">
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-1">You Get</p>
                      <p className="text-3xl font-bold text-blue-600">{formatPoints(totalPoints)}</p>
                      <p className="text-xs text-gray-600 mt-1">points</p>
                      {plan.value && (
                        <p className="text-xs text-gray-500 mt-2">{plan.value}</p>
                      )}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-2">
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{formatPoints(plan.points)} base points</span>
                    </div>
                    {plan.bonusPoints && plan.bonusPoints > 0 && (
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{formatPoints(plan.bonusPoints)} bonus points</span>
                      </div>
                    )}
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">No expiration date</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Instant activation</span>
                    </div>
                  </div>

                  {/* Purchase Button */}
                  <Button
                    onClick={() => {
                      if (isEnterprise) {
                        toast.info('Please contact support for enterprise pricing')
                      } else {
                        setSelectedPackage(plan.id)
                        handlePurchase(plan.id)
                      }
                    }}
                    disabled={loading}
                    className={`w-full ${
                      plan.popular
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                        : ''
                    }`}
                    variant={plan.popular ? 'default' : 'outline'}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    {loading && selectedPackage === plan.id ? 'Processing...' : isEnterprise ? 'Contact Sales' : 'Buy Now'}
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Point Costs Info */}
        <Alert className="mt-6 bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
          <Info className="h-5 w-5 text-amber-600" />
          <AlertDescription className="text-amber-900">
            <p className="font-semibold mb-2">Point Costs:</p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>• Front Image: 1 point</div>
              <div>• Back Image: 2 points</div>
              <div>• Sleeve: 1 point each</div>
              <div>• Collar: 1 point each</div>
            </div>
          </AlertDescription>
        </Alert>

        {/* Example Calculations */}
        <Alert className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <TrendingUp className="h-5 w-5 text-green-600" />
          <AlertDescription className="text-green-900">
            <p className="font-semibold mb-2">What You Can Do:</p>
            <div className="text-sm space-y-1">
              <p>With <strong>700 points</strong>: ~175 full jerseys (front + back + 2 sleeves)</p>
              <p>With <strong>1800 points</strong>: ~450 full jerseys (front + back + 2 sleeves)</p>
            </div>
          </AlertDescription>
        </Alert>
      </DialogContent>
    </Dialog>
  )
}

