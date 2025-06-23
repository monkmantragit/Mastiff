'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle, 
  Star, 
  Globe, 
  Sparkles, 
  Target, 
  Users, 
  Zap,
  Heart,
  Award,
  Send,
  Eye,
  Palette,
  Smartphone,
  Timer
} from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -40 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
  transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
};

interface FeedbackData {
  name: string;
  role: string;
  responses: Record<string, any>;
}

const questions = [
  {
    id: 'first_impression',
    title: 'First Impressions Matter',
    subtitle: 'Your immediate reaction to our new design',
    icon: Eye,
    type: 'rating_with_comment',
    question: 'How would you rate your first impression of the new White Massif website compared to the current live site?',
    options: [
      { value: 5, label: 'Exceptional', description: 'Dramatically better, premium feel' },
      { value: 4, label: 'Great', description: 'Noticeable improvement' },
      { value: 3, label: 'Good', description: 'Moderate improvement' },
      { value: 2, label: 'Fair', description: 'Minor differences' },
      { value: 1, label: 'Poor', description: 'Prefer the current site' }
    ],
    followUp: 'What specifically caught your attention first?'
  },
  {
    id: 'visual_design',
    title: 'Visual Design Excellence',
    subtitle: 'Evaluating our aesthetic choices',
    icon: Palette,
    type: 'multi_choice',
    question: 'Which visual elements of the new design resonate most with you?',
    options: [
      { value: 'color_scheme', label: 'Color Scheme & Branding', description: 'Premium gold & navy palette' },
      { value: 'typography', label: 'Typography & Fonts', description: 'Modern, readable font choices' },
      { value: 'layout', label: 'Layout & Spacing', description: 'Clean, organized structure' },
      { value: 'animations', label: 'Animations & Interactions', description: 'Smooth, engaging transitions' },
      { value: 'imagery', label: 'Photography & Media', description: 'High-quality visual content' },
      { value: 'overall_aesthetic', label: 'Overall Aesthetic', description: 'Complete design harmony' }
    ],
    allowMultiple: true,
    followUp: 'Any specific suggestions for visual improvements?'
  },
  {
    id: 'user_experience',
    title: 'User Experience Evaluation',
    subtitle: 'How intuitive and engaging is the journey?',
    icon: Users,
    type: 'rating_with_comment',
    question: 'Rate the overall user experience and navigation flow of the new site',
    options: [
      { value: 5, label: 'Seamless', description: 'Effortless navigation, very intuitive' },
      { value: 4, label: 'Smooth', description: 'Easy to use with minor friction' },
      { value: 3, label: 'Decent', description: 'Generally good, some confusion' },
      { value: 2, label: 'Challenging', description: 'Requires effort to navigate' },
      { value: 1, label: 'Confusing', description: 'Difficult to understand' }
    ],
    followUp: 'What would make the navigation even more intuitive?'
  },
  {
    id: 'mobile_experience',
    title: 'Mobile-First Excellence',
    subtitle: 'Responsive design performance',
    icon: Smartphone,
    type: 'rating_with_comment',
    question: 'How does the mobile experience compare to the current site?',
    options: [
      { value: 5, label: 'Outstanding', description: 'Perfect mobile optimization' },
      { value: 4, label: 'Excellent', description: 'Great mobile experience' },
      { value: 3, label: 'Good', description: 'Solid mobile performance' },
      { value: 2, label: 'Fair', description: 'Some mobile issues' },
      { value: 1, label: 'Poor', description: 'Mobile experience needs work' }
    ],
    followUp: 'Any specific mobile usability concerns?'
  },
  {
    id: 'content_presentation',
    title: 'Content & Messaging',
    subtitle: 'How well do we tell the White Massif story?',
    icon: Target,
    type: 'rating_with_comment',
    question: 'Rate how effectively the new design presents White Massif\'s services and expertise',
    options: [
      { value: 5, label: 'Compelling', description: 'Clearly communicates value proposition' },
      { value: 4, label: 'Effective', description: 'Good communication of services' },
      { value: 3, label: 'Adequate', description: 'Decent content presentation' },
      { value: 2, label: 'Unclear', description: 'Some confusion about services' },
      { value: 1, label: 'Poor', description: 'Doesn\'t effectively communicate value' }
    ],
    followUp: 'Which sections need clearer messaging?'
  },
  {
    id: 'trust_credibility',
    title: 'Trust & Credibility',
    subtitle: 'Does the design build confidence?',
    icon: Award,
    type: 'rating_with_comment',
    question: 'How well does the new design establish trust and credibility for White Massif?',
    options: [
      { value: 5, label: 'Highly Trustworthy', description: 'Instills complete confidence' },
      { value: 4, label: 'Trustworthy', description: 'Builds good confidence' },
      { value: 3, label: 'Moderately Trustworthy', description: 'Reasonable confidence level' },
      { value: 2, label: 'Somewhat Trustworthy', description: 'Limited confidence building' },
      { value: 1, label: 'Lacks Credibility', description: 'Doesn\'t build trust effectively' }
    ],
    followUp: 'What elements would strengthen credibility?'
  },
  {
    id: 'performance_speed',
    title: 'Performance & Speed',
    subtitle: 'Technical excellence evaluation',
    icon: Zap,
    type: 'rating_with_comment',
    question: 'Rate the loading speed and performance of the new site',
    options: [
      { value: 5, label: 'Lightning Fast', description: 'Exceptional loading times' },
      { value: 4, label: 'Fast', description: 'Good performance' },
      { value: 3, label: 'Average', description: 'Acceptable loading times' },
      { value: 2, label: 'Slow', description: 'Noticeable delays' },
      { value: 1, label: 'Very Slow', description: 'Significant performance issues' }
    ],
    followUp: 'Any specific performance concerns or slow-loading sections?'
  },
  {
    id: 'competitive_advantage',
    title: 'Competitive Edge',
    subtitle: 'Standing out in the event management space',
    icon: Globe,
    type: 'rating_with_comment',
    question: 'How well does this design differentiate White Massif from competitors?',
    options: [
      { value: 5, label: 'Unique Leader', description: 'Sets new industry standards' },
      { value: 4, label: 'Strong Differentiator', description: 'Clear competitive advantage' },
      { value: 3, label: 'Moderate Differentiation', description: 'Some unique elements' },
      { value: 2, label: 'Slight Differentiation', description: 'Minor competitive edge' },
      { value: 1, label: 'Generic', description: 'Doesn\'t stand out from competitors' }
    ],
    followUp: 'What would make White Massif stand out even more?'
  },
  {
    id: 'conversion_potential',
    title: 'Conversion & Engagement',
    subtitle: 'Will this design drive business results?',
    icon: Target,
    type: 'rating_with_comment',
    question: 'Rate the likelihood that this design will convert visitors into clients',
    options: [
      { value: 5, label: 'Highly Converting', description: 'Excellent conversion potential' },
      { value: 4, label: 'Good Converting', description: 'Strong conversion elements' },
      { value: 3, label: 'Moderately Converting', description: 'Average conversion potential' },
      { value: 2, label: 'Low Converting', description: 'Limited conversion elements' },
      { value: 1, label: 'Unlikely to Convert', description: 'Poor conversion potential' }
    ],
    followUp: 'What specific elements would improve conversion rates?'
  },
  {
    id: 'content_messaging',
    title: 'Content & Messaging Strategy',
    subtitle: 'Help us perfect our story and positioning',
    icon: Target,
    type: 'open_ended',
    question: 'What key messages or content would make White Massif more compelling to potential clients?',
    followUp: 'What specific services, achievements, or unique selling points should we highlight more prominently?'
  },
  {
    id: 'industry_insights',
    title: 'Industry Perspective',
    subtitle: 'Your expertise in event management',
    icon: Award,
    type: 'multi_choice',
    question: 'What aspects of event management are most important to showcase for credibility?',
    options: [
      { value: 'client_testimonials', label: 'Client Testimonials & Reviews', description: 'Social proof and success stories' },
      { value: 'portfolio_showcase', label: 'Detailed Portfolio Cases', description: 'In-depth project breakdowns' },
      { value: 'team_expertise', label: 'Team Credentials & Experience', description: 'Professional backgrounds and skills' },
      { value: 'process_methodology', label: 'Event Planning Process', description: 'How they approach projects' },
      { value: 'technology_tools', label: 'Technology & Tools Used', description: 'Modern event tech capabilities' },
      { value: 'sustainability_practices', label: 'Sustainable Event Practices', description: 'Eco-friendly approaches' },
      { value: 'budget_transparency', label: 'Pricing & Budget Guidance', description: 'Clear cost expectations' },
      { value: 'vendor_network', label: 'Vendor & Supplier Network', description: 'Trusted partner ecosystem' }
    ],
    allowMultiple: true,
    followUp: 'Any other credibility factors we should consider highlighting?'
  },
  {
    id: 'missing_content',
    title: 'Content Gaps & Opportunities',
    subtitle: 'Thinking from a potential client\'s perspective',
    icon: Sparkles,
    type: 'open_ended',
    question: 'From a potential client\'s perspective, what information is missing that would help them make a decision to hire White Massif?',
    followUp: 'What questions would a prospective client want answered before booking an event management company?'
  },
  {
    id: 'overall_recommendation',
    title: 'Final Verdict',
    subtitle: 'Your comprehensive assessment',
    icon: Heart,
    type: 'recommendation',
    question: 'Would you recommend launching this new design for White Massif?',
    options: [
      { value: 'launch_immediately', label: 'Launch Immediately', description: 'Ready to go live now' },
      { value: 'launch_with_minor_changes', label: 'Launch with Minor Tweaks', description: 'Small improvements needed' },
      { value: 'significant_revisions', label: 'Needs Significant Revisions', description: 'Major changes required' },
      { value: 'complete_redesign', label: 'Complete Redesign', description: 'Start over with new approach' }
    ],
    followUp: 'What are your top 3 recommendations for improvement?'
  }
];

export default function FeedbackPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FeedbackData>({
    name: '',
    role: '',
    responses: {}
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });

  const handleStart = () => {
    setCurrentStep(1);
  };

  const handleNext = () => {
    if (currentStep < questions.length + 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleResponse = (questionId: string, value: any, comment?: string) => {
    setFormData(prev => ({
      ...prev,
      responses: {
        ...prev.responses,
        [questionId]: { value, comment }
      }
    }));
  };

  const handleUserInfo = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      const webhookUrl = process.env.NEXT_PUBLIC_FEEDBACK_WEBHOOK_URL;
      
      if (!webhookUrl) {
        throw new Error('Webhook URL not configured');
      }

      // Build enhanced responses with full question context
      const enhancedResponses = Object.keys(formData.responses).map(questionId => {
        const question = questions.find(q => q.id === questionId);
        const userResponse = formData.responses[questionId];
        
        return {
          questionId,
          question: {
            title: question?.title,
            subtitle: question?.subtitle,
            question: question?.question,
            type: question?.type,
            options: question?.options || null,
            followUp: question?.followUp || null,
            allowMultiple: question?.allowMultiple || false
          },
          userResponse: {
            value: userResponse.value,
            comment: userResponse.comment || null,
            // For multi-choice questions, also include the readable labels
            selectedLabels: question?.options && Array.isArray(userResponse.value) 
              ? userResponse.value.map(val => question.options.find(opt => opt.value === val)?.label).filter(Boolean)
              : question?.options && userResponse.value
              ? question.options.find(opt => opt.value === userResponse.value)?.label
              : null
          }
        };
      });

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          type: 'design_feedback',
          user: {
            name: formData.name,
            role: formData.role
          },
          responses: enhancedResponses,
          summary: {
            totalQuestions: questions.length,
            answeredQuestions: Object.keys(formData.responses).length,
            completionRate: `${Math.round((Object.keys(formData.responses).length / questions.length) * 100)}%`
          },
          metadata: {
            userAgent: navigator.userAgent,
            referrer: document.referrer,
            url: window.location.href
          }
        })
      });

      if (!response.ok) {
        throw new Error('Failed to submit feedback');
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Error submitting feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const progress = ((currentStep - 1) / questions.length) * 100;

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F9A625]/5 to-[#2A3959]/5 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="glass p-12 rounded-3xl">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-24 h-24 bg-gradient-to-br from-[#F9A625] to-[#2A3959] rounded-full flex items-center justify-center mx-auto mb-8"
            >
              <CheckCircle className="w-12 h-12 text-white" />
            </motion.div>
            
            <h1 className="text-4xl font-heading font-bold mb-4 bg-gradient-to-r from-[#F9A625] to-[#2A3959] bg-clip-text text-transparent">
              Thank You!
            </h1>
            
            <p className="text-xl text-neutral-600 mb-8">
              Your feedback has been submitted successfully. We'll review your insights and use them to refine the White Massif experience.
            </p>
            
            <Button 
              onClick={() => window.location.href = '/'}
              className="btn-primary px-8 py-3 text-lg"
            >
              Return to Homepage
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F9A625]/5 to-[#2A3959]/5">
      {/* Progress Bar */}
      {currentStep > 0 && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-neutral-200">
          <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-neutral-600">
                {currentStep} of {questions.length}
              </span>
              <div className="w-48 h-2 bg-neutral-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#F9A625] to-[#2A3959]"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
            <Badge className="bg-[#F9A625] text-black border-none">
              White Massif Feedback
            </Badge>
          </div>
        </div>
      )}

      <div className="pt-20 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {currentStep === 0 && (
              <motion.div
                key="intro"
                {...fadeInUp}
                className="text-center"
                ref={heroRef}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="mb-8"
                >
                  <Badge className="bg-[#F9A625]/10 text-[#F9A625] border-[#F9A625]/20 mb-6">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Design Feedback Collection
                  </Badge>
                  
                  <h1 className="text-6xl font-heading font-bold mb-6 bg-gradient-to-r from-[#F9A625] to-[#2A3959] bg-clip-text text-transparent">
                    Help Us Perfect
                    <br />
                    White Massif's Vision
                  </h1>
                  
                  <p className="text-xl text-neutral-600 max-w-3xl mx-auto mb-12 leading-relaxed">
                    We've reimagined White Massif's digital presence with cutting-edge design and technology. 
                    Your expert insights will help us ensure we've created something truly exceptional.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="grid md:grid-cols-3 gap-6 mb-12"
                >
                  <Card className="p-6 glass border-none">
                    <Timer className="w-8 h-8 text-[#F9A625] mb-4" />
                    <h3 className="font-heading font-semibold mb-2">5 Minutes</h3>
                    <p className="text-sm text-neutral-600">Quick, focused questions</p>
                  </Card>
                  
                                     <Card className="p-6 glass border-none">
                     <Target className="w-8 h-8 text-[#F9A625] mb-4" />
                     <h3 className="font-heading font-semibold mb-2">13 Key Areas</h3>
                     <p className="text-sm text-neutral-600">Design + content strategy evaluation</p>
                   </Card>
                  
                  <Card className="p-6 glass border-none">
                    <Heart className="w-8 h-8 text-[#F9A625] mb-4" />
                    <h3 className="font-heading font-semibold mb-2">Your Impact</h3>
                    <p className="text-sm text-neutral-600">Shape the final design</p>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="space-y-6"
                >
                                     <div className="space-y-4">
                     <div className="grid md:grid-cols-2 gap-4">
                       <div>
                         <Label htmlFor="name" className="text-sm font-medium text-neutral-700 mb-2 block">
                           Your Name *
                         </Label>
                         <Input
                           id="name"
                           value={formData.name}
                           onChange={(e) => handleUserInfo('name', e.target.value)}
                           placeholder="Enter your full name"
                           className="w-full"
                         />
                       </div>
                       <div>
                         <Label htmlFor="role" className="text-sm font-medium text-neutral-700 mb-2 block">
                           Your Role (Optional)
                         </Label>
                         <Input
                           id="role"
                           value={formData.role}
                           onChange={(e) => handleUserInfo('role', e.target.value)}
                           placeholder="e.g., Marketing Director"
                           className="w-full"
                         />
                       </div>
                     </div>
                   </div>

                                     <Button 
                     onClick={handleStart}
                     disabled={!formData.name}
                     className="btn-primary px-8 py-4 text-lg"
                   >
                     Begin Feedback Session
                     <ArrowRight className="w-5 h-5 ml-2" />
                   </Button>
                </motion.div>
              </motion.div>
            )}

            {currentStep > 0 && currentStep <= questions.length && (
              <QuestionCard
                key={currentStep}
                question={questions[currentStep - 1]}
                currentResponse={formData.responses[questions[currentStep - 1].id]}
                onResponse={handleResponse}
                onNext={handleNext}
                onPrevious={handlePrevious}
                canGoBack={currentStep > 1}
                isLastQuestion={currentStep === questions.length}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function QuestionCard({ 
  question, 
  currentResponse, 
  onResponse, 
  onNext, 
  onPrevious, 
  canGoBack, 
  isLastQuestion, 
  onSubmit, 
  isSubmitting 
}: {
  question: any;
  currentResponse: any;
  onResponse: (questionId: string, value: any, comment?: string) => void;
  onNext: () => void;
  onPrevious: () => void;
  canGoBack: boolean;
  isLastQuestion: boolean;
  onSubmit: () => void;
  isSubmitting: boolean;
}) {
  const [selectedValue, setSelectedValue] = useState(currentResponse?.value || '');
  const [comment, setComment] = useState(currentResponse?.comment || '');
  const [multiSelect, setMultiSelect] = useState<string[]>(
    Array.isArray(currentResponse?.value) ? currentResponse.value : []
  );

  const handleContinue = () => {
    if (question.type === 'multi_choice' && question.allowMultiple) {
      onResponse(question.id, multiSelect, comment);
    } else {
      onResponse(question.id, selectedValue, comment);
    }
    
    if (isLastQuestion) {
      onSubmit();
    } else {
      onNext();
    }
  };

  const handleMultiSelect = (value: string) => {
    const newSelection = multiSelect.includes(value)
      ? multiSelect.filter(v => v !== value)
      : [...multiSelect, value];
    setMultiSelect(newSelection);
  };

  const isValid = question.type === 'multi_choice' && question.allowMultiple 
    ? multiSelect.length > 0 
    : selectedValue;

  const Icon = question.icon;

  return (
    <motion.div
      {...fadeInUp}
      className="max-w-3xl mx-auto"
    >
      <Card className="glass border-none p-8 lg:p-12">
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-16 h-16 bg-gradient-to-br from-[#F9A625] to-[#2A3959] rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Icon className="w-8 h-8 text-white" />
          </motion.div>
          
          <h2 className="text-3xl font-heading font-bold mb-2 text-neutral-900">
            {question.title}
          </h2>
          <p className="text-lg text-neutral-600 mb-8">
            {question.subtitle}
          </p>
          
          <div className="bg-neutral-50 rounded-2xl p-6 mb-8">
            <p className="text-lg font-medium text-neutral-800">
              {question.question}
            </p>
          </div>
        </div>

                 <div className="space-y-4 mb-8">
           {question.type === 'open_ended' ? (
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.2 }}
             >
               <Label className="text-sm font-medium text-neutral-700 mb-3 block">
                 Share your detailed thoughts and suggestions:
               </Label>
               <Textarea
                 value={selectedValue}
                 onChange={(e) => setSelectedValue(e.target.value)}
                 placeholder="Please provide your insights, suggestions, or recommendations..."
                 className="w-full min-h-[150px] resize-none"
               />
             </motion.div>
           ) : (
             question.options?.map((option: any, index: number) => (
            <motion.div
              key={option.value}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className={`p-6 cursor-pointer transition-all duration-300 hover:scale-[1.02] ${
                  (question.type === 'multi_choice' && question.allowMultiple)
                    ? (multiSelect.includes(option.value) 
                        ? 'ring-2 ring-[#F9A625] bg-[#F9A625]/5 border-[#F9A625]/20' 
                        : 'hover:bg-neutral-50 border-neutral-200')
                    : (selectedValue === option.value 
                        ? 'ring-2 ring-[#F9A625] bg-[#F9A625]/5 border-[#F9A625]/20' 
                        : 'hover:bg-neutral-50 border-neutral-200')
                }`}
                onClick={() => {
                  if (question.type === 'multi_choice' && question.allowMultiple) {
                    handleMultiSelect(option.value);
                  } else {
                    setSelectedValue(option.value);
                  }
                }}
              >
                <div className="flex items-start gap-4">
                  {question.type === 'rating_with_comment' && (
                    <div className="flex items-center gap-1 flex-shrink-0">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < option.value ? 'text-[#F9A625] fill-current' : 'text-neutral-300'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                  
                  <div className="flex-1">
                    <h4 className="font-heading font-semibold text-lg mb-2 text-neutral-900">
                      {option.label}
                    </h4>
                    <p className="text-neutral-600">
                      {option.description}
                    </p>
                  </div>
                  
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    ((question.type === 'multi_choice' && question.allowMultiple && multiSelect.includes(option.value)) ||
                     (selectedValue === option.value))
                      ? 'bg-[#F9A625] border-[#F9A625]'
                      : 'border-neutral-300'
                  }`}>
                    {((question.type === 'multi_choice' && question.allowMultiple && multiSelect.includes(option.value)) ||
                      (selectedValue === option.value)) && (
                      <CheckCircle className="w-4 h-4 text-white" />
                    )}
                  </div>
                </div>
                             </Card>
             </motion.div>
           )))}
         </div>

        {question.followUp && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <Label className="text-sm font-medium text-neutral-700 mb-3 block">
              {question.followUp}
            </Label>
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your thoughts... (optional)"
              className="w-full min-h-[100px] resize-none"
            />
          </motion.div>
        )}

        <div className="flex items-center justify-between">
          <Button
            onClick={onPrevious}
            disabled={!canGoBack}
            variant="outline"
            className="px-6 py-3"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          
          <Button
            onClick={handleContinue}
            disabled={!isValid || isSubmitting}
            className="btn-primary px-8 py-3"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Submitting...
              </>
            ) : isLastQuestion ? (
              <>
                Submit Feedback
                <Send className="w-4 h-4 ml-2" />
              </>
            ) : (
              <>
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}