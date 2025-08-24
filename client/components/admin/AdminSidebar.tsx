import { useState } from "react";
import { 
  Home, 
  Star, 
  Shield, 
  Image, 
  MessageCircle, 
  Megaphone, 
  Link,
  Menu,
  X,
  Settings,
  Download,
  Upload,
  RotateCcw,
  Eye
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AdminSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  onExport?: () => void;
  onImport?: () => void;
  onResetAll?: () => void;
  onPreview?: () => void;
  className?: string;
}

const sidebarSections = [
  { id: "hero", label: "Hero Section", icon: Home, description: "Main title, pricing, and hero image" },
  { id: "benefits", label: "Benefits", icon: Star, description: "Product benefits and features" },
  { id: "trust", label: "Trust Section", icon: Shield, description: "Walmart branding and trust indicators" },
  { id: "gallery", label: "Gallery", icon: Image, description: "Product image gallery" },
  { id: "reviews", label: "Reviews", icon: MessageCircle, description: "Customer reviews and testimonials" },
  { id: "finalCTA", label: "Final CTA", icon: Megaphone, description: "Final call-to-action section" },
  { id: "footer", label: "Footer", icon: Link, description: "Social media links and footer content" },
];

export function AdminSidebar({
  activeSection,
  onSectionChange,
  onExport,
  onImport,
  onResetAll,
  onPreview,
  className,
}: AdminSidebarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSectionClick = (sectionId: string) => {
    onSectionChange(sectionId);
    setIsMobileMenuOpen(false); // Close mobile menu on selection
  };

  const SidebarContent = () => (
    <>
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">Admin Dashboard</h2>
        <p className="text-sm text-gray-600 mt-1">Manage your site content</p>
      </div>

      {/* Navigation Sections */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <div className="mb-4">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Content Sections
          </h3>
          {sidebarSections.map((section) => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;
            
            return (
              <button
                key={section.id}
                onClick={() => handleSectionClick(section.id)}
                className={cn(
                  "w-full flex items-start gap-3 px-3 py-2 rounded-lg text-left transition-colors duration-200",
                  isActive
                    ? "bg-blue-100 text-blue-700 border-blue-200"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                )}
              >
                <Icon className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="font-medium text-sm">{section.label}</div>
                  <div className="text-xs text-gray-500 mt-0.5 line-clamp-2">
                    {section.description}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Action Buttons */}
      <div className="p-4 border-t border-gray-200 space-y-2">
        <div className="mb-3">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Actions
          </h3>
        </div>
        
        {onPreview && (
          <Button
            variant="outline"
            size="sm"
            onClick={onPreview}
            className="w-full justify-start gap-2"
          >
            <Eye className="h-4 w-4" />
            Preview Site
          </Button>
        )}

        {onExport && (
          <Button
            variant="outline"
            size="sm"
            onClick={onExport}
            className="w-full justify-start gap-2"
          >
            <Download className="h-4 w-4" />
            Export Content
          </Button>
        )}

        {onImport && (
          <Button
            variant="outline"
            size="sm"
            onClick={onImport}
            className="w-full justify-start gap-2"
          >
            <Upload className="h-4 w-4" />
            Import Content
          </Button>
        )}

        {onResetAll && (
          <Button
            variant="outline"
            size="sm"
            onClick={onResetAll}
            className="w-full justify-start gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <RotateCcw className="h-4 w-4" />
            Reset All
          </Button>
        )}
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={toggleMobileMenu}
          className="bg-white shadow-lg"
        >
          {isMobileMenuOpen ? (
            <X className="h-4 w-4" />
          ) : (
            <Menu className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Desktop Sidebar */}
      <div className={cn(
        "hidden lg:flex lg:flex-col lg:w-80 lg:fixed lg:left-0 lg:top-0 lg:h-full bg-white border-r border-gray-200 shadow-sm",
        className
      )}>
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      <div className={cn(
        "lg:hidden fixed left-0 top-0 h-full w-80 bg-white border-r border-gray-200 shadow-lg z-50 transform transition-transform duration-300 ease-in-out flex flex-col",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <SidebarContent />
      </div>
    </>
  );
}
