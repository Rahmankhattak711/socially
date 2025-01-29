"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { LoaderIcon } from "lucide-react";
import toast from "react-hot-toast";
import { toggleFollow } from "@/app/action/userAction";

export default function FollowButton() {
  const [loading, setLoading] = useState(false);

  const handleFollow = async () => {
    try {
      setLoading(true);
      await toggleFollow( "clerkId");
    } catch (error) {
      toast.error("Failed to follow user");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button size={"sm"} className="w-20" variant="secondary" disabled={loading}>
      {loading ? <LoaderIcon className="animate-spin" /> : "Follow"}
    </Button>
  );
}
