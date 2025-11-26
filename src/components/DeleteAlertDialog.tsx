"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { Loader2Icon, Trash2Icon } from "lucide-react";
import { useState } from "react";

interface DeleteAlertDialogProps {
  isDeleting: boolean;
  onDelete: () => Promise<void>;
}

export function DeleteAlertDialog({
  isDeleting,
  onDelete,
}: DeleteAlertDialogProps) {
  const [confirmText, setConfirmText] = useState("");
  const isConfirmed = confirmText.trim().toUpperCase() === "DELETE";

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-red-500"
          aria-label="Delete post"
        >
          {isDeleting ? (
            <Loader2Icon className="size-4 animate-spin" />
          ) : (
            <Trash2Icon className="size-4" />
          )}
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <div className="mt-2">
          <p className="text-sm text-muted-foreground">
            To confirm, type <span className="font-medium">DELETE</span> below.
          </p>

          <input
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            className="mt-3 w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            placeholder="Type DELETE to confirm"
            aria-label="Type DELETE to confirm deletion"
          />
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onDelete}
            className={buttonVariants({ variant: "destructive" })}
            disabled={!isConfirmed || isDeleting}
          >
            {isDeleting ? (
              <Loader2Icon className="size-4 animate-spin mr-2" />
            ) : null}
            {isDeleting ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
