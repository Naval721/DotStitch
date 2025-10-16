import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Zap, 
  Crown, 
  Sparkles, 
  CheckCircle, 
  TrendingUp,
  Gift,
  ShoppingCart,
  Info
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { PointsPurchase } from "@/components/points/PointsPurchase";
import { POINTS_PLANS, calculateTotalPoints, formatPoints, formatCurrency } from "@/types/points";

const Pricing = () => {
  const { user, profile } = useAuth();
  const [showPurchaseDialog, setShowPurchaseDialog] = useState(false);

  const currentPoints = profile?.points_balance || 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50">
    <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-green-100 text-green-700 hover:bg-green-100">
            🎉 Free Trial: 5 Free Exports for New Users!
          </Badge>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Simple, Fair Pricing
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Try our platform with 5 free exports! Then buy points to continue.
            Points never expire!
          </p>
        </div>

        {/* Current Balance (if logged in) */}
        {user && (
          <div className="max-w-md mx-auto mb-12">
            <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm mb-1">Your Current Balance</p>
                    <p className="text-3xl font-bold">{formatPoints(currentPoints)} points</p>
                  </div>
                  <Button 
                    onClick={() => setShowPurchaseDialog(true)}
                    variant="secondary"
                    className="bg-white text-blue-600 hover:bg-blue-50"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Buy More
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {POINTS_PLANS.map((plan) => {
            const totalPoints = calculateTotalPoints(plan);
            const isEnterprise = plan.id === 'enterprise';
            
            return (
              <Card 
                key={plan.id} 
                className={`relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
                  plan.popular ? 'border-2 border-blue-500 shadow-xl md:scale-105' : 'border-2'
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-bl-lg text-sm font-semibold">
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3" />
                      <span>Best Value</span>
                    </div>
                  </div>
                )}

                <CardHeader className="text-center pb-4">
                  <div className="mx-auto w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mb-4 shadow-lg">
                    {plan.id === 'basic' && <Zap className="w-10 h-10 text-white" />}
                    {plan.id === 'professional' && <Crown className="w-10 h-10 text-white" />}
                    {plan.id === 'enterprise' && <Sparkles className="w-10 h-10 text-white" />}
                  </div>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription className="text-base">{plan.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Price */}
                  <div className="text-center">
                    {isEnterprise ? (
                      <div className="space-y-2">
                        <p className="text-4xl font-bold text-gray-900">Custom</p>
                        <p className="text-sm text-gray-600">Contact for pricing</p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <p className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                          {formatCurrency(plan.price)}
                        </p>
                        {plan.bonusPoints && plan.bonusPoints > 0 && (
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            <Gift className="w-3 h-3 mr-1" />
                            +{formatPoints(plan.bonusPoints)} bonus points
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Points Display */}
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border-2 border-blue-200">
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-2">You Get</p>
                      <p className="text-4xl font-bold text-blue-600">{formatPoints(totalPoints)}</p>
                      <p className="text-sm text-gray-600 mt-1">points</p>
                      {plan.value && (
                        <p className="text-xs text-gray-500 mt-2">{plan.value}</p>
                      )}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-sm">{formatPoints(plan.points)} base points</span>
                    </div>
                    {plan.bonusPoints && plan.bonusPoints > 0 && (
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                        <span className="text-sm">{formatPoints(plan.bonusPoints)} bonus points</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-sm">No expiration date</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-sm">Instant activation</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-sm">Use for any export type</span>
                    </div>
                  </div>

                  {/* Purchase Button */}
                  <Button
                    onClick={() => {
                      if (isEnterprise) {
                        window.location.href = 'mailto:support@jerseyartist.com?subject=Enterprise Pricing Inquiry'
                      } else if (user) {
                        setShowPurchaseDialog(true)
                      } else {
                        // Show login modal
                        window.location.href = '/'
                      }
                    }}
                    className={`w-full h-12 text-lg ${
                      plan.popular
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                        : ''
                    }`}
                    variant={plan.popular ? 'default' : 'outline'}
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    {isEnterprise ? 'Contact Sales' : user ? 'Buy Now' : 'Sign Up to Buy'}
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Point Costs */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-2xl">
                <Info className="w-6 h-6 text-blue-600" />
                <span>Point Costs</span>
              </CardTitle>
              <CardDescription>How many points each export costs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <p className="text-3xl font-bold text-blue-600 mb-2">1</p>
                  <p className="text-sm text-gray-600">Front Image</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <p className="text-3xl font-bold text-blue-600 mb-2">2</p>
                  <p className="text-sm text-gray-600">Back Image</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <p className="text-3xl font-bold text-blue-600 mb-2">1</p>
                  <p className="text-sm text-gray-600">Per Sleeve</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <p className="text-3xl font-bold text-blue-600 mb-2">1</p>
                  <p className="text-sm text-gray-600">Collar</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Example Calculations */}
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-2xl">
                <TrendingUp className="w-6 h-6 text-green-600" />
                <span>What You Can Do</span>
              </CardTitle>
              <CardDescription>Example calculations with your points</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <p className="font-semibold text-lg mb-2">Basic Package (700 points)</p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• 700 front images</li>
                    <li>• 350 back images</li>
                    <li>• 175 full jerseys (front + back + 2 sleeves)</li>
                    <li>• 140 full jerseys with collar</li>
                  </ul>
      </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <p className="font-semibold text-lg mb-2">Professional Package (2000 points)</p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• 2000 front images</li>
                    <li>• 1000 back images</li>
                    <li>• 500 full jerseys (front + back + 2 sleeves)</li>
                    <li>• 400 full jerseys with collar</li>
              </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* FAQ */}
        <div className="max-w-4xl mx-auto mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Do points expire?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">No! Your points never expire. Use them whenever you need.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Can I get a refund?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Yes, unused points can be refunded within 30 days of purchase.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What payment methods do you accept?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">We accept all major credit cards, debit cards, UPI, and net banking.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Need a custom package?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Contact us for enterprise pricing with custom point packages and volume discounts.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Points Purchase Dialog */}
      {user && (
        <PointsPurchase
          isOpen={showPurchaseDialog}
          onClose={() => setShowPurchaseDialog(false)}
          onPurchase={async (packageId) => {
            // This will be handled by the useAuth hook
            console.log('Purchase package:', packageId)
          }}
          currentPoints={currentPoints}
        />
      )}
    </div>
  );
};

export default Pricing;
