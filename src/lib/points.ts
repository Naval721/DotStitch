// Points utility functions

import { POINT_COSTS, calculateExportCost } from '@/types/points'

/**
 * Calculate the total points needed for a bulk export
 * @param frontCount - Number of front images
 * @param backCount - Number of back images
 * @param sleevesCount - Number of sleeves
 * @param collarsCount - Number of collars
 * @returns Total points needed
 */
export const calculateBulkExportCost = (
  frontCount: number = 0,
  backCount: number = 0,
  sleevesCount: number = 0,
  collarsCount: number = 0
): number => {
  const frontCost = frontCount * POINT_COSTS.FRONT_IMAGE
  const backCost = backCount * POINT_COSTS.BACK_IMAGE
  const sleevesCost = sleevesCount * POINT_COSTS.SLEEVE
  const collarsCost = collarsCount * POINT_COSTS.COLLAR

  return frontCost + backCost + sleevesCost + collarsCost
}

/**
 * Calculate points for exporting a full jersey set
 * @param includeCollar - Whether to include collar
 * @returns Points needed
 */
export const calculateFullJerseyCost = (includeCollar: boolean = false): number => {
  return includeCollar 
    ? calculateExportCost('fullWithCollar')
    : calculateExportCost('full')
}

/**
 * Format points with proper Indian number formatting
 * @param points - Points to format
 * @returns Formatted string
 */
export const formatPoints = (points: number): string => {
  return new Intl.NumberFormat('en-IN').format(points)
}

/**
 * Format currency in Indian Rupees
 * @param amount - Amount to format
 * @returns Formatted currency string
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR'
  }).format(amount)
}

/**
 * Calculate savings when buying a larger package
 * @param basePoints - Base points in package
 * @param bonusPoints - Bonus points
 * @param price - Package price
 * @returns Savings percentage
 */
export const calculateSavings = (
  basePoints: number,
  bonusPoints: number,
  price: number
): number => {
  const totalPoints = basePoints + bonusPoints
  const pricePerPoint = price / totalPoints
  const basePricePerPoint = price / basePoints
  
  return ((basePricePerPoint - pricePerPoint) / basePricePerPoint) * 100
}

/**
 * Get export type from description
 * @param description - Export description
 * @returns Export type
 */
export const getExportType = (description: string): string => {
  if (description.includes('Front')) return 'front'
  if (description.includes('Back')) return 'back'
  if (description.includes('Sleeve')) return 'sleeve'
  if (description.includes('Collar')) return 'collar'
  if (description.includes('Full')) return 'full'
  return 'unknown'
}

/**
 * Validate points balance before export
 * @param currentBalance - Current points balance
 * @param pointsNeeded - Points needed for export
 * @returns Validation result
 */
export const validatePointsBalance = (
  currentBalance: number,
  pointsNeeded: number
): { valid: boolean; message?: string } => {
  if (currentBalance < pointsNeeded) {
    return {
      valid: false,
      message: `Insufficient points. You need ${pointsNeeded} points but only have ${currentBalance} points.`
    }
  }
  
  return { valid: true }
}

/**
 * Calculate estimated exports possible with current balance
 * @param balance - Current points balance
 * @returns Object with estimated exports
 */
export const estimateExports = (balance: number) => {
  return {
    frontOnly: Math.floor(balance / POINT_COSTS.FRONT_IMAGE),
    backOnly: Math.floor(balance / POINT_COSTS.BACK_IMAGE),
    fullJersey: Math.floor(balance / POINT_COSTS.FULL_JERSEY),
    fullJerseyWithCollar: Math.floor(balance / POINT_COSTS.FULL_JERSEY_WITH_COLLAR),
    sleeves: Math.floor(balance / POINT_COSTS.SLEEVE),
    collars: Math.floor(balance / POINT_COSTS.COLLAR)
  }
}

/**
 * Generate transaction description
 * @param exportType - Type of export
 * @param count - Number of items
 * @returns Description string
 */
export const generateTransactionDescription = (
  exportType: 'front' | 'back' | 'sleeve' | 'collar' | 'full' | 'fullWithCollar',
  count: number = 1
): string => {
  const descriptions = {
    front: `Exported ${count} front image${count > 1 ? 's' : ''}`,
    back: `Exported ${count} back image${count > 1 ? 's' : ''}`,
    sleeve: `Exported ${count} sleeve${count > 1 ? 's' : ''}`,
    collar: `Exported ${count} collar${count > 1 ? 's' : ''}`,
    full: `Exported ${count} full jersey${count > 1 ? 's' : ''}`,
    fullWithCollar: `Exported ${count} full jersey${count > 1 ? 's' : ''} with collar`
  }
  
  return descriptions[exportType]
}

/**
 * Calculate refund points (for failed exports or cancellations)
 * @param pointsUsed - Points that were used
 * @param refundPercentage - Percentage to refund (default 100%)
 * @returns Refund amount
 */
export const calculateRefund = (
  pointsUsed: number,
  refundPercentage: number = 100
): number => {
  return Math.floor(pointsUsed * (refundPercentage / 100))
}

