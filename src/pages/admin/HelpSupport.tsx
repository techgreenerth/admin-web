import {
  Mail,
  Phone,
  MessageCircle,
  HelpCircle,
  FileText,
  ExternalLink,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function HelpSupport() {
  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add API call to submit support ticket
    console.log("Support ticket submitted");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#295F58]">Help & Support</h1>
        <p className="text-muted-foreground mt-1">
          Get assistance with the Greenerth dMRV Platform
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Phone className="h-5 w-5 text-[#295F58]" />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <a
                  href="mailto:support@techgreenerth.com"
                  className="text-[#295F58] hover:underline"
                >
                  support@techgreenerth.com
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <a href="tel:+911234567890" className="hover:underline">
                  +91 123 456 7890
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MessageCircle className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">
                  Available Mon-Fri, 9 AM - 6 PM IST
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Links */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="h-5 w-5 text-[#295F58]" />
              Documentation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => window.open("#", "_blank")}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              User Guide
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => window.open("#", "_blank")}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              API Documentation
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => window.open("#", "_blank")}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Video Tutorials
            </Button>
          </CardContent>
        </Card>

        {/* System Status */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-[#295F58]" />
              System Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">API Server</span>
              <span className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                Operational
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Database</span>
              <span className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                Operational
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Mobile App
              </span>
              <span className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                Operational
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* FAQs */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                How do I verify production records?
              </AccordionTrigger>
              <AccordionContent>
                Navigate to the respective module (e.g., Biochar Production),
                find the record with "Submitted" status, click on the actions
                menu, and select "Verify". Review all details before confirming
                verification.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                How do I add a new site or kontiki?
              </AccordionTrigger>
              <AccordionContent>
                Go to the Sites or Kontikis page, click the "Create" button,
                fill in all required fields including GPS coordinates, and
                submit the form. The new entry will be available immediately.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                What should I do if a record is rejected?
              </AccordionTrigger>
              <AccordionContent>
                When rejecting a record, provide a clear rejection note
                explaining the reason. The user will see this note in their
                mobile app and can resubmit the record with corrections.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>
                How do I export data for reporting?
              </AccordionTrigger>
              <AccordionContent>
                Use the filter options on each page to narrow down records, then
                use the export functionality (available in the dashboard) to
                download data in CSV or Excel format for reporting purposes.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      {/* Support Ticket Form */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Submit Support Ticket</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmitTicket} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input id="name" placeholder="Your name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Subject *</Label>
              <Input id="subject" placeholder="Brief description" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message *</Label>
              <Textarea
                id="message"
                placeholder="Describe your issue or question..."
                rows={6}
                required
              />
            </div>
            <Button type="submit" className="bg-[#295F58] hover:bg-[#1e4540]">
              Submit Ticket
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
