import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Edit } from "lucide-react";

interface updatePostProps {
  editedContent: string;
  handleUpdatePost: () => Promise<void>;
  setEditedContent: React.Dispatch<React.SetStateAction<string>>;
  isUpdating: boolean;
}

export function UpdatePost({
  editedContent,
  handleUpdatePost,
  setEditedContent,
  isUpdating,
}: updatePostProps) {
  return (
    <div>
      {" "}
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">
            {" "}
            <Edit />{" "}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Update Post</DialogTitle>
          </DialogHeader>
          <div className="flex items-center gap-2">
            <div className="grid flex-1 gap-2">
              <Label className="sr-only">Content</Label>
              <Textarea
                placeholder="What's on your mind?"
                className="min-h-[100px] bg-card px-2 text-base outline-none resize-none border-none"
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                onClick={handleUpdatePost}
                type="button"
                variant="secondary"
              >
                {isUpdating ? "Updating..." : "Update"}
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
