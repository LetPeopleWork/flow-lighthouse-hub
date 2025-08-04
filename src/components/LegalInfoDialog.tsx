import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

interface LegalInfoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultTab?: "impressum" | "privacy" | "terms";
}

const LegalInfoDialog: React.FC<LegalInfoDialogProps> = ({
  open,
  onOpenChange,
  defaultTab = "impressum",
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Legal Information</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue={defaultTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="impressum">Impressum</TabsTrigger>
            <TabsTrigger value="privacy">Privacy Policy</TabsTrigger>
            <TabsTrigger value="terms">Terms & Conditions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="impressum" className="mt-6">
            <div className="prose prose-sm max-w-none">
              <h1 className="text-2xl font-bold mb-4">Impressum</h1>
              
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">LetPeopleWork GmbH</h2>
                <p className="text-muted-foreground">
                  Mühlackerstrasse 108<br />
                  8046 Zürich<br />
                  Schweiz
                </p>
              </div>
              
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Contact</h2>
                <p className="text-muted-foreground">
                  E-Mail: <a href="mailto:contact@letpeople.work" className="text-primary hover:underline">contact@letpeople.work</a><br />
                  Internet: <a href="https://letpeople.work" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://letpeople.work</a>
                </p>
              </div>
              
              <div>
                <p className="text-muted-foreground mb-2">
                  <strong>Handelsregistereintrag:</strong> CHE-475.430.912
                </p>
                <p className="text-muted-foreground">
                  <strong>Vertretungsberechtigte Personen:</strong><br />
                  Benjamin Max Huser, Geschäftsführer<br />
                  Peter Waldemar Zylka-Greger, Geschäftsführer
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="privacy" className="mt-6">
            <div className="prose prose-sm max-w-none">
              <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
              <p className="text-muted-foreground">
                Privacy policy content will be added here.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="terms" className="mt-6">
            <div className="prose prose-sm max-w-none">
              <h1 className="text-2xl font-bold mb-4">Terms and Conditions</h1>
              <p className="text-muted-foreground">
                Terms and conditions content will be added here.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default LegalInfoDialog;
