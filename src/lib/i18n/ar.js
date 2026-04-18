const ar = {
  // App
  appName: 'طريقي باص',

  // Navigation
  navMap: 'الخريطة',
  navSearch: 'البحث',
  navRoutes: 'الخطوط',
  navRatings: 'التقييمات',
  navAdmin: 'الإدارة',
  toggleDarkMode: 'تبديل الوضع الداكن',
  toggleMenu: 'تبديل القائمة',

  // City
  city: 'المدينة',
  allCities: 'جميع مدن الجزائر',
  selectCity: 'اختر مدينة...',
  cityTransportNetwork: 'شبكة نقل {city}',
  algeriaTransportNetwork: 'شبكة النقل العام في الجزائر',
  routesInCity: 'خطوط الحافلات في {city}',
  routesInAllCities: 'جميع خطوط الحافلات في الجزائر',
  noRoutesInCity: 'لا توجد خطوط في هذه المدينة بعد.',

  // Map page
  busRoutes: 'خطوط الحافلات',
  algiersTransportNetwork: 'شبكة النقل العام في الجزائر',
  showAllRoutes: 'عرض جميع الخطوط ←',
  stopsCount: '{count} محطات',
  close: 'إغلاق',
  routesButton: '🚌 الخطوط',

  // Search
  findYourRoute: 'ابحث عن مسارك',
  from: 'من',
  to: 'إلى',
  startLocation: 'نقطة الانطلاق...',
  destination: 'الوجهة...',
  selectOnMap: '📍 الخريطة',
  searchRoutes: 'بحث',
  routesFound: 'تم العثور على {count} مسار(ات)',
  noRoutesFound: 'لم يتم العثور على مسارات',
  tryDifferentLocations: 'جرب مواقع مختلفة أو وسّع منطقة البحث.',
  bestRoute: '✨ أفضل مسار',
  estimatedTime: '~{time} دقيقة',
  kmWalk: '{distance} كم مشياً',
  walk: '🚶 مشي {distance} كم',
  clickMapToSelectOrigin: '👆 انقر على الخريطة لتحديد نقطة الانطلاق',
  clickMapToSelectDest: '👆 انقر على الخريطة لتحديد الوجهة',

  // Routes page
  allAvailableRoutes: 'جميع خطوط الحافلات المتاحة في الجزائر العاصمة',
  reviews: '⭐ التقييمات',
  viewOnMap: '🗺️ عرض على الخريطة',

  // Ratings
  ratingsAndReviews: 'التقييمات والآراء',
  shareExperience: 'شارك تجربتك مع خطوط الحافلات',
  selectRoute: 'اختر خطاً',
  chooseRoute: 'اختر خط حافلة...',
  reviewsCount: '{count} تقييمات',
  leaveReview: 'أضف تقييماً',
  yourName: 'اسمك',
  anonymous: 'مجهول',
  rating: 'التقييم',
  comment: 'التعليق',
  commentPlaceholder: 'شارك تجربتك... (التأخير، الراحة، سلوك السائق)',
  submitReview: 'إرسال التقييم',
  reviewsList: 'التقييمات ({count})',
  noReviewsYet: 'لا توجد تقييمات بعد. كن أول من يقيّم!',

  // Admin
  adminDashboard: 'لوحة تحكم المسؤول',
  manageRoutes: 'إدارة الخطوط والمحطات والحافلات والتقييمات',
  tabRoutes: 'الخطوط',
  tabStops: 'المحطات',
  tabBuses: 'الحافلات',
  tabTracking: 'التتبع',
  tabComments: 'التعليقات',

  // Route Manager
  createNewRoute: 'إنشاء خط جديد',
  editRoute: 'تعديل الخط',
  routeNamePlaceholder: 'اسم الخط (مثال: خط 1 - باب الزوار ← وسط الجزائر)',
  busNumber: 'رقم الحافلة',
  saveChanges: 'حفظ التعديلات',
  createRoute: 'إنشاء الخط',
  addStopToRoute: '+ إضافة محطة للخط',
  selectStop: 'اختر محطة...',

  // Stop Manager
  addNewStop: 'إضافة محطة جديدة',
  editStop: 'تعديل المحطة',
  stopName: 'اسم المحطة',
  latitude: 'خط العرض',
  longitude: 'خط الطول',
  stopTip: 'نصيحة: استخدم صفحة الخريطة لإيجاد الإحداثيات بالنقر على المواقع.',
  save: 'حفظ',
  addStop: 'إضافة المحطة',

  // Bus Manager
  addNewBus: 'إضافة حافلة جديدة',
  editBus: 'تعديل الحافلة',
  busNumberPlaceholder: 'رقم الحافلة (مثال: B-006)',
  statusActive: 'نشط',
  statusMaintenance: 'صيانة',
  statusInactive: 'غير نشط',
  noRouteAssigned: 'لا يوجد خط مخصص',
  addBus: 'إضافة الحافلة',
  noRoute: 'لا يوجد خط',

  // Comment Moderator
  commentModeration: 'إدارة التعليقات',
  totalReviews: '{count} تقييمات إجمالية',
  noReviewsToModerate: 'لا توجد تقييمات للمراجعة.',
  routeLabel: 'الخط: {name}',
  deleteReview: 'حذف التقييم',
  userSuggestions: 'اقتراحات المستخدمين ({count})',
  noPendingSuggestions: 'لا توجد اقتراحات قيد الانتظار.',
  estimatedTimeLabel: 'الوقت المقدر',
  walkToStartLabel: 'المشي إلى نقطة البداية',
  walkFromEndLabel: 'المشي إلى الوجهة',

  // Tracking
  liveBusTracking: 'تتبع الحافلات المباشر',
  simulatedTrackingDesc: 'تتبع محاكي (نسخة تجريبية) - تحديث المواقع كل 5 ثوانٍ',
  noActiveBuses: 'لا توجد حافلات نشطة.',
  nearStop: 'بالقرب من: {name}',
  trackingModeSimulated: '📡 وضع التتبع: محاكي',
  trackingExplanation: 'مواقع الحافلات محاكية بناءً على المحطات. في المراحل القادمة، سيتوفر تتبع GPS حقيقي عبر تطبيق السائق.',

  // Map popups
  yourLocation: 'موقعك (نقطة البداية)',
  destinationLabel: 'الوجهة',
  busLabel: 'حافلة {number}',
  startPoint: 'البداية',
  destinationPoint: 'الوجهة',
  suggestionsTitle: 'الاقتراحات',
  suggestionPlaceholder: 'اقترح محطة أو تعديل',
  submitSuggestion: 'إرسال الاقتراح',
  searchHint: 'اختر نقطة الانطلاق والوجهة لحساب مسار متعدد الحافلات.',
};

export default ar;
