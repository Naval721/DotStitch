import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useAuth } from '@/hooks/useAuth'
import { Eye, EyeOff, Mail, Lock, User, Star, Lock as LockIcon, Rocket, Sparkles, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  defaultMode?: 'signin' | 'signup'
  onSuccess?: () => void
  showOTPVerification?: boolean
}

export const AuthModal = ({ isOpen, onClose, defaultMode = 'signin', onSuccess, showOTPVerification = false }: AuthModalProps) => {
  const [mode, setMode] = useState<'signin' | 'signup'>(defaultMode)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<{[key: string]: string}>({})
  const [touched, setTouched] = useState<{[key: string]: boolean}>({})
  const [needsOTPVerification, setNeedsOTPVerification] = useState(false)
  const [newUserId, setNewUserId] = useState<string | null>(null)
  const { signIn, signUp } = useAuth()

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      resetForm()
    }
  }, [isOpen])

  // Real-time validation
  useEffect(() => {
    validateField('email', email)
  }, [email])

  useEffect(() => {
    validateField('password', password)
  }, [password])

  useEffect(() => {
    if (mode === 'signup') {
      validateField('fullName', fullName)
    }
  }, [fullName, mode])

  const validateField = (field: string, value: string) => {
    const newErrors = { ...errors }
    
    switch (field) {
      case 'email':
        if (!value) {
          newErrors.email = 'Email is required'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors.email = 'Please enter a valid email address'
        } else {
          delete newErrors.email
        }
        break
      case 'password':
        if (!value) {
          newErrors.password = 'Password is required'
        } else if (value.length < 6) {
          newErrors.password = 'Password must be at least 6 characters'
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
          newErrors.password = 'Password must contain uppercase, lowercase, and number'
        } else {
          delete newErrors.password
        }
        break
      case 'fullName':
        if (mode === 'signup' && !value) {
          newErrors.fullName = 'Full name is required'
        } else if (mode === 'signup' && value.length < 2) {
          newErrors.fullName = 'Full name must be at least 2 characters'
        } else {
          delete newErrors.fullName
        }
        break
    }
    
    setErrors(newErrors)
  }

  const handleBlur = (field: string) => {
    setTouched({ ...touched, [field]: true })
  }

  const isFormValid = () => {
    const requiredFields = mode === 'signup' ? ['email', 'password', 'fullName'] : ['email', 'password']
    return requiredFields.every(field => !errors[field] && (field === 'fullName' ? fullName : field === 'email' ? email : password))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Mark all fields as touched
    const allTouched = { email: true, password: true, ...(mode === 'signup' ? { fullName: true } : {}) }
    setTouched(allTouched)
    
    // Validate all fields
    validateField('email', email)
    validateField('password', password)
    if (mode === 'signup') {
      validateField('fullName', fullName)
    }
    
    if (!isFormValid()) {
      toast.error('Please fix the errors below')
      return
    }
    
    setLoading(true)

    try {
      if (mode === 'signin') {
        const { error } = await signIn(email, password)
        if (!error) {
          resetForm()
          // Call onSuccess callback if provided
          if (onSuccess) {
            onSuccess()
          } else {
            onClose()
          }
        }
      } else {
        const { error, data } = await signUp(email, password, fullName)
        if (!error && data?.user) {
          // Set user ID for OTP verification
          setNewUserId(data.user.id)
          
          // If OTP verification is enabled, show OTP screen
          if (showOTPVerification) {
            setNeedsOTPVerification(true)
            toast.success('Account created! Please verify your email with the OTP sent.')
          } else {
            resetForm()
            // Call onSuccess callback if provided
            if (onSuccess) {
              onSuccess()
            } else {
              onClose()
            }
          }
        }
      }
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setEmail('')
    setPassword('')
    setFullName('')
    setShowPassword(false)
    setErrors({})
    setTouched({})
  }

  const switchMode = () => {
    setMode(mode === 'signin' ? 'signup' : 'signin')
    resetForm()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-hidden flex flex-col animate-in fade-in-0 zoom-in-95 duration-300">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="text-center text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            DotStitch
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-1 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100">
          <div className="space-y-8 pb-4">
            {/* Features Preview */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="space-y-3">
                <div className="mx-auto w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center shadow-lg">
                  <Star className="w-6 h-6 text-blue-600" />
                </div>
                <p className="text-sm font-semibold text-slate-700">Premium Quality</p>
              </div>
              <div className="space-y-3">
                <div className="mx-auto w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center shadow-lg">
                  <LockIcon className="w-6 h-6 text-green-600" />
                </div>
                <p className="text-sm font-semibold text-slate-700">Enterprise Security</p>
              </div>
              <div className="space-y-3">
                <div className="mx-auto w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center shadow-lg">
                  <Rocket className="w-6 h-6 text-purple-600" />
                </div>
                <p className="text-sm font-semibold text-slate-700">Lightning Fast</p>
              </div>
            </div>

            <Separator />

            {/* Auth Form */}
            <Card className="border-2 border-slate-200 shadow-2xl bg-white/98 backdrop-blur-sm rounded-3xl overflow-hidden">
              <CardHeader className="space-y-2 pb-6 bg-gradient-to-r from-slate-50 via-blue-50 to-purple-50 rounded-t-3xl border-b border-slate-200">
                <CardTitle className="text-2xl text-center font-bold text-slate-800">
                  {mode === 'signin' ? 'Welcome Back' : 'Create Your Account'}
                </CardTitle>
                <CardDescription className="text-center text-lg text-slate-600">
                  {mode === 'signin' 
                    ? 'Sign in to access your professional design tools' 
                    : 'Join thousands of professional designers creating amazing jerseys'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8 bg-gradient-to-b from-white to-slate-50">
                <form onSubmit={handleSubmit} className="space-y-6">
                {mode === 'signup' && (
                  <div className="space-y-3">
                    <Label htmlFor="fullName" className="text-sm font-semibold text-slate-700">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-4 top-4 h-5 w-5 text-slate-400" />
                      <Input
                        id="fullName"
                        type="text"
                        placeholder="Enter your full name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        onBlur={() => handleBlur('fullName')}
                        className={`pl-12 h-12 text-lg border-2 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md ${
                          errors.fullName && touched.fullName
                            ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                            : 'border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
                        }`}
                        required
                      />
                      {fullName && !errors.fullName && (
                        <CheckCircle className="absolute right-4 top-4 h-5 w-5 text-green-500" />
                      )}
                    </div>
                    {errors.fullName && touched.fullName && (
                      <Alert className="border-red-200 bg-red-50">
                        <AlertCircle className="h-4 w-4 text-red-500" />
                        <AlertDescription className="text-red-700 text-sm">
                          {errors.fullName}
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                )}

                <div className="space-y-3">
                  <Label htmlFor="email" className="text-sm font-semibold text-slate-700">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-4 h-5 w-5 text-slate-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onBlur={() => handleBlur('email')}
                      className={`pl-12 h-12 text-lg border-2 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md ${
                        errors.email && touched.email
                          ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                          : 'border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
                      }`}
                      required
                    />
                    {email && !errors.email && (
                      <CheckCircle className="absolute right-4 top-4 h-5 w-5 text-green-500" />
                    )}
                  </div>
                  {errors.email && touched.email && (
                    <Alert className="border-red-200 bg-red-50">
                      <AlertCircle className="h-4 w-4 text-red-500" />
                      <AlertDescription className="text-red-700 text-sm">
                        {errors.email}
                      </AlertDescription>
                    </Alert>
                  )}
                </div>

                <div className="space-y-3">
                  <Label htmlFor="password" className="text-sm font-semibold text-slate-700">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-4 h-5 w-5 text-slate-400" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onBlur={() => handleBlur('password')}
                      className={`pl-12 pr-12 h-12 text-lg border-2 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md ${
                        errors.password && touched.password
                          ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                          : 'border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
                      }`}
                      required
                      minLength={6}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-2 h-8 w-8 p-0 hover:bg-slate-100 rounded-lg"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-slate-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-slate-400" />
                      )}
                    </Button>
                    {password && !errors.password && (
                      <CheckCircle className="absolute right-12 top-4 h-5 w-5 text-green-500" />
                    )}
                  </div>
                  {errors.password && touched.password && (
                    <Alert className="border-red-200 bg-red-50">
                      <AlertCircle className="h-4 w-4 text-red-500" />
                      <AlertDescription className="text-red-700 text-sm">
                        {errors.password}
                      </AlertDescription>
                    </Alert>
                  )}
                  {mode === 'signup' && !errors.password && (
                    <div className="space-y-2">
                      <p className="text-xs text-slate-500">Password requirements:</p>
                      <div className="space-y-1 text-xs">
                        <div className={`flex items-center space-x-2 ${password.length >= 6 ? 'text-green-600' : 'text-slate-400'}`}>
                          <CheckCircle className="h-3 w-3" />
                          <span>At least 6 characters</span>
                        </div>
                        <div className={`flex items-center space-x-2 ${/(?=.*[a-z])/.test(password) ? 'text-green-600' : 'text-slate-400'}`}>
                          <CheckCircle className="h-3 w-3" />
                          <span>One lowercase letter</span>
                        </div>
                        <div className={`flex items-center space-x-2 ${/(?=.*[A-Z])/.test(password) ? 'text-green-600' : 'text-slate-400'}`}>
                          <CheckCircle className="h-3 w-3" />
                          <span>One uppercase letter</span>
                        </div>
                        <div className={`flex items-center space-x-2 ${/(?=.*\d)/.test(password) ? 'text-green-600' : 'text-slate-400'}`}>
                          <CheckCircle className="h-3 w-3" />
                          <span>One number</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
                  disabled={loading || !isFormValid()}
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Please wait...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      {mode === 'signin' ? (
                        <>
                          <Lock className="w-5 h-5" />
                          <span>Sign In</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-5 h-5" />
                          <span>Create Account</span>
                        </>
                      )}
                    </div>
                  )}
                </Button>
                </form>

                <div className="mt-8 text-center">
                  <p className="text-base text-slate-600">
                    {mode === 'signin' ? "Don't have an account? " : "Already have an account? "}
                    <Button
                      variant="link"
                      className="p-0 h-auto font-bold text-blue-600 hover:text-blue-700 text-base"
                      onClick={switchMode}
                    >
                      {mode === 'signin' ? 'Create Account' : 'Sign In'}
                    </Button>
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Free Trial Info */}
            {mode === 'signup' && (
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl border-2 border-blue-200 shadow-lg">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-bold text-blue-900 text-lg">Free Trial Included</span>
                </div>
                <p className="text-blue-700 font-medium">
                  Start with 5 free professional exports, then upgrade for unlimited access to all premium features
                </p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
