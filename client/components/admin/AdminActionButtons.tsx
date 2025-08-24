import { useState } from "react";
import { Save, RotateCcw, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";

interface AdminActionButtonsProps {
  onSave: () => void;
  onReset: () => void;
  isSaving?: boolean;
  saveDisabled?: boolean;
  className?: string;
  showResetConfirmation?: boolean;
}

export function AdminActionButtons({
  onSave,
  onReset,
  isSaving = false,
  saveDisabled = false,
  className,
  showResetConfirmation = true,
}: AdminActionButtonsProps) {
  const [showResetDialog, setShowResetDialog] = useState(false);

  const handleReset = () => {
    if (showResetConfirmation) {
      setShowResetDialog(true);
    } else {
      onReset();
    }
  };

  const confirmReset = () => {
    onReset();
    setShowResetDialog(false);
  };

  return (
    <div className={cn("flex gap-3 justify-end", className)}>
      {/* Reset Button */}
      {showResetConfirmation ? (
        <AlertDialog open={showResetDialog} onOpenChange={setShowResetDialog}>
          <AlertDialogTrigger asChild>
            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
              disabled={isSaving}
              className="flex items-center gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                Reset Changes
              </AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to reset all changes? This will revert all 
                fields in this section to their previously saved values. This action 
                cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction 
                onClick={confirmReset}
                className="bg-orange-600 hover:bg-orange-700"
              >
                Reset Changes
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ) : (
        <Button
          type="button"
          variant="outline"
          onClick={handleReset}
          disabled={isSaving}
          className="flex items-center gap-2"
        >
          <RotateCcw className="h-4 w-4" />
          Reset
        </Button>
      )}

      {/* Save Button */}
      <Button
        type="button"
        onClick={onSave}
        disabled={saveDisabled || isSaving}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
      >
        <Save className="h-4 w-4" />
        {isSaving ? "Saving..." : "Save Changes"}
      </Button>
    </div>
  );
}
