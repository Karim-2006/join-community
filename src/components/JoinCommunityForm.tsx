import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Languages } from "lucide-react";

type Language = "en" | "ta" | "hi";

const translations = {
  en: {
    title: "Join Our WhatsApp Community 💬",
    description: "Connect with like-minded individuals, share knowledge, get exclusive updates, and grow together. Be part of an engaging community where learning meets networking!",
    fullName: "Full Name",
    email: "Email Address",
    whatsappNumber: "WhatsApp Number",
    required: "*",
    fullNamePlaceholder: "Enter your full name",
    emailPlaceholder: "your.email@example.com",
    phonePlaceholder: "1234567890",
    phoneHelper: "Enter 10-13 digits without spaces or special characters",
    rulesTitle: "Community Rules & Guidelines",
    rules: [
      "No spamming or promotional links",
      "Respect every member",
      "No hate speech or bullying",
      "Stay on topic",
      "Don't share fake news",
      "Admin decisions are final"
    ],
    agreeCheckbox: "I have read and agree to all the community rules and guidelines listed above.",
    privacyNote: "Privacy Note:",
    privacyText: "Your phone number will be used only for community access and will not be shared publicly or with third parties.",
    submitButton: "Join Community",
    successTitle: "Welcome Aboard! 🎉",
    successDescription: "Thank you for joining our community,",
    successMessage: "Click the button below to join our WhatsApp group and start connecting with fellow members.",
    joinWhatsAppButton: "Join WhatsApp Group 💬",
    confirmationEmail: "We've sent a confirmation email to",
    errors: {
      fullNameRequired: "Full name is required",
      emailRequired: "Email is required",
      emailInvalid: "Please enter a valid email address",
      phoneRequired: "WhatsApp number is required",
      phoneInvalid: "Please enter a valid 10-13 digit phone number",
      validationError: "Validation Error",
      fixErrors: "Please fix the errors in the form",
      agreementRequired: "Agreement Required",
      agreeToRules: "Please agree to the community rules to continue"
    },
    successToast: "Success! 🎉",
    successToastDescription: "Your request has been received. Click below to join the group!",
    selectLanguage: "Select Language"
  },
  ta: {
    title: "எங்கள் WhatsApp சமூகத்தில் சேரவும் 💬",
    description: "ஒத்த எண்ணம் கொண்ட நபர்களுடன் இணையுங்கள், அறிவைப் பகிர்ந்து கொள்ளுங்கள், பிரத்தியேக புதுப்பிப்புகளைப் பெறுங்கள், மற்றும் ஒன்றாக வளருங்கள். கற்றல் மற்றும் நெட்வொர்க்கிங் சந்திக்கும் ஈர்க்கும் சமூகத்தின் ஒரு பகுதியாக இருங்கள்!",
    fullName: "முழு பெயர்",
    email: "மின்னஞ்சல் முகவரி",
    whatsappNumber: "WhatsApp எண்",
    required: "*",
    fullNamePlaceholder: "உங்கள் முழு பெயரை உள்ளிடவும்",
    emailPlaceholder: "your.email@example.com",
    phonePlaceholder: "1234567890",
    phoneHelper: "இடைவெளிகள் அல்லது சிறப்பு எழுத்துக்கள் இல்லாமல் 10-13 இலக்கங்களை உள்ளிடவும்",
    rulesTitle: "சமூக விதிகள் மற்றும் வழிகாட்டுதல்கள்",
    rules: [
      "ஸ்பேம் அல்லது விளம்பர இணைப்புகள் இல்லை",
      "ஒவ்வொரு உறுப்பினரையும் மதிக்கவும்",
      "வெறுப்பு பேச்சு அல்லது கொடுமைப்படுத்துதல் இல்லை",
      "தலைப்பில் இருங்கள்",
      "போலி செய்திகளைப் பகிர வேண்டாம்",
      "நிர்வாக முடிவுகள் இறுதியானவை"
    ],
    agreeCheckbox: "மேலே பட்டியலிடப்பட்ட அனைத்து சமூக விதிகள் மற்றும் வழிகாட்டுதல்களையும் நான் படித்து ஒப்புக்கொள்கிறேன்.",
    privacyNote: "தனியுரிமை குறிப்பு:",
    privacyText: "உங்கள் தொலைபேசி எண் சமூக அணுகலுக்கு மட்டுமே பயன்படுத்தப்படும் மற்றும் பொதுவில் அல்லது மூன்றாம் தரப்பினருடன் பகிரப்படாது.",
    submitButton: "சமூகத்தில் சேரவும்",
    successTitle: "வரவேற்கிறோம்! 🎉",
    successDescription: "எங்கள் சமூகத்தில் சேர்ந்தமைக்கு நன்றி,",
    successMessage: "கீழே உள்ள பொத்தானைக் கிளிக் செய்து எங்கள் WhatsApp குழுவில் சேர்ந்து சக உறுப்பினர்களுடன் இணைக்கத் தொடங்குங்கள்.",
    joinWhatsAppButton: "WhatsApp குழுவில் சேரவும் 💬",
    confirmationEmail: "உறுதிப்படுத்தல் மின்னஞ்சலை இங்கு அனுப்பியுள்ளோம்",
    errors: {
      fullNameRequired: "முழு பெயர் தேவை",
      emailRequired: "மின்னஞ்சல் தேவை",
      emailInvalid: "செல்லுபடியாகும் மின்னஞ்சல் முகவரியை உள்ளிடவும்",
      phoneRequired: "WhatsApp எண் தேவை",
      phoneInvalid: "செல்லுபடியாகும் 10-13 இலக்க தொலைபேசி எண்ணை உள்ளிடவும்",
      validationError: "சரிபார்ப்பு பிழை",
      fixErrors: "படிவத்தில் உள்ள பிழைகளைச் சரிசெய்யவும்",
      agreementRequired: "ஒப்பந்தம் தேவை",
      agreeToRules: "தொடர சமூக விதிகளை ஒப்புக்கொள்ளவும்"
    },
    successToast: "வெற்றி! 🎉",
    successToastDescription: "உங்கள் கோரிக்கை பெறப்பட்டது. குழுவில் சேர கீழே கிளிக் செய்யவும்!",
    selectLanguage: "மொழியைத் தேர்ந்தெடுக்கவும்"
  },
  hi: {
    title: "हमारे WhatsApp समुदाय में शामिल हों 💬",
    description: "समान विचारधारा वाले लोगों से जुड़ें, ज्ञान साझा करें, विशेष अपडेट प्राप्त करें, और एक साथ बढ़ें। एक आकर्षक समुदाय का हिस्सा बनें जहां सीखना और नेटवर्किंग मिलते हैं!",
    fullName: "पूरा नाम",
    email: "ईमेल पता",
    whatsappNumber: "WhatsApp नंबर",
    required: "*",
    fullNamePlaceholder: "अपना पूरा नाम दर्ज करें",
    emailPlaceholder: "your.email@example.com",
    phonePlaceholder: "1234567890",
    phoneHelper: "स्पेस या विशेष वर्णों के बिना 10-13 अंक दर्ज करें",
    rulesTitle: "समुदाय नियम और दिशानिर्देश",
    rules: [
      "कोई स्पैम या प्रचार लिंक नहीं",
      "हर सदस्य का सम्मान करें",
      "कोई घृणास्पद भाषण या धमकाना नहीं",
      "विषय पर बने रहें",
      "फर्जी खबरें साझा न करें",
      "व्यवस्थापक के निर्णय अंतिम हैं"
    ],
    agreeCheckbox: "मैंने ऊपर सूचीबद्ध सभी समुदाय नियमों और दिशानिर्देशों को पढ़ लिया है और उनसे सहमत हूं।",
    privacyNote: "गोपनीयता नोट:",
    privacyText: "आपका फोन नंबर केवल समुदाय तक पहुंच के लिए उपयोग किया जाएगा और सार्वजनिक रूप से या तीसरे पक्ष के साथ साझा नहीं किया जाएगा।",
    submitButton: "समुदाय में शामिल हों",
    successTitle: "स्वागत है! 🎉",
    successDescription: "हमारे समुदाय में शामिल होने के लिए धन्यवाद,",
    successMessage: "नीचे दिए गए बटन पर क्लिक करें और हमारे WhatsApp ग्रुप में शामिल हों और साथी सदस्यों से जुड़ना शुरू करें।",
    joinWhatsAppButton: "WhatsApp ग्रुप में शामिल हों 💬",
    confirmationEmail: "हमने एक पुष्टिकरण ईमेल भेजा है",
    errors: {
      fullNameRequired: "पूरा नाम आवश्यक है",
      emailRequired: "ईमेल आवश्यक है",
      emailInvalid: "कृपया एक मान्य ईमेल पता दर्ज करें",
      phoneRequired: "WhatsApp नंबर आवश्यक है",
      phoneInvalid: "कृपया एक मान्य 10-13 अंकों का फोन नंबर दर्ज करें",
      validationError: "सत्यापन त्रुटि",
      fixErrors: "कृपया फॉर्म में त्रुटियों को ठीक करें",
      agreementRequired: "समझौता आवश्यक",
      agreeToRules: "कृपया जारी रखने के लिए समुदाय नियमों से सहमत हों"
    },
    successToast: "सफलता! 🎉",
    successToastDescription: "आपका अनुरोध प्राप्त हो गया है। ग्रुप में शामिल होने के लिए नीचे क्लिक करें!",
    selectLanguage: "भाषा चुनें"
  }
};

const JoinCommunityForm = () => {
  const [language, setLanguage] = useState<Language>("en");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    whatsappNumber: ""
  });
  const [agreedToRules, setAgreedToRules] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const t = translations[language];

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^\d{10,13}$/;
    return phoneRegex.test(phone.replace(/\s/g, ""));
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = t.errors.fullNameRequired;
    }

    if (!formData.email.trim()) {
      newErrors.email = t.errors.emailRequired;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = t.errors.emailInvalid;
    }

    if (!formData.whatsappNumber.trim()) {
      newErrors.whatsappNumber = t.errors.phoneRequired;
    } else if (!validatePhone(formData.whatsappNumber)) {
      newErrors.whatsappNumber = t.errors.phoneInvalid;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: t.errors.validationError,
        description: t.errors.fixErrors,
        variant: "destructive"
      });
      return;
    }

    if (!agreedToRules) {
      toast({
        title: t.errors.agreementRequired,
        description: t.errors.agreeToRules,
        variant: "destructive"
      });
      return;
    }

    // Simulate form submission
    setSubmitted(true);
    toast({
      title: t.successToast,
      description: t.successToastDescription
    });
  };

  const handleJoinWhatsApp = () => {
    // Replace with your actual WhatsApp group invite URL
    const whatsappUrl = "https://chat.whatsapp.com/F7jgmnDn5oTCQ6OaHFvBUW";
    window.open(whatsappUrl, "_blank");
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-3 sm:p-4 md:p-6 animate-fade-in">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="text-center px-4 sm:px-6 pt-6 sm:pt-8">
            <div className="mx-auto mb-3 sm:mb-4 w-14 h-14 sm:w-16 sm:h-16 bg-primary rounded-full flex items-center justify-center">
              <span className="text-3xl sm:text-4xl">✓</span>
            </div>
            <CardTitle className="text-xl sm:text-2xl md:text-3xl">{t.successTitle}</CardTitle>
            <CardDescription className="text-sm sm:text-base mt-2">
              {t.successDescription} {formData.fullName}!
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 px-4 sm:px-6 pb-6 sm:pb-8">
            <p className="text-center text-muted-foreground text-sm sm:text-base">
              {t.successMessage}
            </p>
            <Button 
              onClick={handleJoinWhatsApp}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-5 sm:py-6 text-base sm:text-lg shadow-lg hover:shadow-xl transition-all"
            >
              {t.joinWhatsAppButton}
            </Button>
            <p className="text-xs sm:text-sm text-center text-muted-foreground mt-4 break-words">
              {t.confirmationEmail} {formData.email}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-3 sm:p-4 md:p-6 animate-fade-in">
      <Card className="w-full max-w-lg shadow-xl">
        <CardHeader className="text-center px-4 sm:px-6 pt-6 sm:pt-8">
          {/* Language Selector */}
          <div className="flex justify-end mb-4">
            <Select value={language} onValueChange={(value) => setLanguage(value as Language)}>
              <SelectTrigger className="w-[180px] bg-secondary/50">
                <div className="flex items-center gap-2">
                  <Languages className="w-4 h-4" />
                  <SelectValue placeholder={t.selectLanguage} />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="ta">தமிழ் (Tamil)</SelectItem>
                <SelectItem value="hi">हिंदी (Hindi)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-bold">
            {t.title}
          </CardTitle>
          <CardDescription className="text-sm sm:text-base mt-2 px-2 sm:px-0">
            {t.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="px-4 sm:px-6 pb-6 sm:pb-8">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="fullName">{t.fullName} {t.required}</Label>
              <Input
                id="fullName"
                type="text"
                placeholder={t.fullNamePlaceholder}
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                className={errors.fullName ? "border-destructive" : ""}
              />
              {errors.fullName && (
                <p className="text-sm text-destructive">{errors.fullName}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">{t.email} {t.required}</Label>
              <Input
                id="email"
                type="email"
                placeholder={t.emailPlaceholder}
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={errors.email ? "border-destructive" : ""}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email}</p>
              )}
            </div>

            {/* WhatsApp Number */}
            <div className="space-y-2">
              <Label htmlFor="whatsappNumber">{t.whatsappNumber} {t.required}</Label>
              <Input
                id="whatsappNumber"
                type="tel"
                placeholder={t.phonePlaceholder}
                value={formData.whatsappNumber}
                onChange={(e) => handleInputChange("whatsappNumber", e.target.value)}
                className={errors.whatsappNumber ? "border-destructive" : ""}
              />
              {errors.whatsappNumber && (
                <p className="text-sm text-destructive">{errors.whatsappNumber}</p>
              )}
              <p className="text-xs text-muted-foreground">
                {t.phoneHelper}
              </p>
            </div>

            {/* Community Rules */}
            <div className="space-y-2 sm:space-y-3">
              <Label className="text-sm sm:text-base font-semibold">
                {t.rulesTitle}
              </Label>
              <div className="bg-secondary/30 rounded-lg p-3 sm:p-4 max-h-40 sm:max-h-48 overflow-y-auto border border-border">
                <ul className="space-y-1.5 sm:space-y-2">
                  {t.rules.map((rule, index) => (
                    <li key={index} className="flex items-start gap-2 text-xs sm:text-sm">
                      <span className="text-primary font-bold mt-0.5 flex-shrink-0">•</span>
                      <span className="leading-relaxed">{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Agreement Checkbox */}
            <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-muted/50 rounded-lg">
              <Checkbox
                id="agreeRules"
                checked={agreedToRules}
                onCheckedChange={(checked) => setAgreedToRules(checked as boolean)}
                className="mt-0.5"
              />
              <Label 
                htmlFor="agreeRules" 
                className="text-xs sm:text-sm leading-relaxed cursor-pointer"
              >
                {t.agreeCheckbox}
              </Label>
            </div>

            {/* Privacy Note */}
            <div className="bg-secondary/20 border border-border rounded-lg p-2.5 sm:p-3">
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                🔒 <strong>{t.privacyNote}</strong> {t.privacyText}
              </p>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={!agreedToRules}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-5 sm:py-6 text-base sm:text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {t.submitButton}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default JoinCommunityForm;
