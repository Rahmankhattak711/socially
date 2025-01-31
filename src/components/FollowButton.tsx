"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { LoaderIcon } from "lucide-react";
import toast from "react-hot-toast";
import { toggleFollow } from "@/app/action/userAction";

interface FollowButtonProps {
  userId: string;
}

export default function FollowButton({userId}: FollowButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleFollow = async () => {
    setLoading(true);
    try {
      await toggleFollow(userId);
      toast.success("User followed successfully");
    } catch (error) {
      toast.error("Failed to follow user");
      console.error("Error following user:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button size={"sm"} onClick={handleFollow} className="w-20" variant="secondary" disabled={loading}>
      {loading ? <LoaderIcon className="animate-spin" /> : "Follow"}
    </Button>
  );
}
