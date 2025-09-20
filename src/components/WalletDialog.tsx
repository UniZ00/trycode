import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, ExternalLink, Wallet, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface WalletDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WalletDialog({ isOpen, onClose }: WalletDialogProps) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  
  const walletAddress = "0x4a7B2c9f8D1e3A5F7C9B2E4A6D8F1A3C5E7B9D2F";
  const balance = "2.456 AVAX";
  const tokens = "450 SOLAR";

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(walletAddress);
      setCopied(true);
      toast({
        title: "Address copied!",
        description: "Wallet address has been copied to clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Could not copy address to clipboard.",
        variant: "destructive",
      });
    }
  };

  const openInExplorer = () => {
    window.open(`https://subnets.avax.network/address/${walletAddress}`, '_blank');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <Wallet className="h-6 w-6 text-primary" />
            Wallet Details
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Wallet Address */}
          <div className="glass-card p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-muted-foreground">Address</span>
              <Badge variant="secondary" className="text-xs">
                <CheckCircle className="h-3 w-3 mr-1" />
                Connected
              </Badge>
            </div>
            <div className="font-mono text-sm bg-muted rounded-lg p-3 break-all">
              {walletAddress}
            </div>
            <div className="flex gap-2 mt-3">
              <Button variant="outline" size="sm" onClick={copyToClipboard} className="flex-1">
                {copied ? <CheckCircle className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                {copied ? 'Copied!' : 'Copy'}
              </Button>
              <Button variant="outline" size="sm" onClick={openInExplorer} className="flex-1">
                <ExternalLink className="h-4 w-4 mr-2" />
                Explorer
              </Button>
            </div>
          </div>

          {/* Balance */}
          <div className="grid grid-cols-2 gap-3">
            <div className="glass-card p-4">
              <div className="text-sm text-muted-foreground mb-1">AVAX Balance</div>
              <div className="text-xl font-bold text-foreground">{balance}</div>
            </div>
            <div className="glass-card p-4">
              <div className="text-sm text-muted-foreground mb-1">SOLAR Tokens</div>
              <div className="text-xl font-bold text-foreground">{tokens}</div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-2">
            <Button className="w-full solar-gradient">
              View Transaction History
            </Button>
            <Button variant="outline" className="w-full" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}