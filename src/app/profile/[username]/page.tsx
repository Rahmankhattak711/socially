import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import PostCard from "@/components/PostCard";
import SuggestedUser from "@/components/SuggestedUser";
import { getDbUserId } from "@/app/action/userAction";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import FollowButton from "@/components/FollowButton";

type Props = {
  params: {
    username: string;
  };
};

export default async function ProfilePage({ params }: Props) {
  const { username } = params;

  const user = await prisma.user.findUnique({
    where: { username },
    select: {
      id: true,
      name: true,
      username: true,
      image: true,
      bio: true,
      location: true,
      website: true,
      _count: {
        select: { followers: true, following: true, posts: true },
      },
    },
  });

  if (!user) return notFound();

  const posts = await prisma.post.findMany({
    where: {
      author: {
        username,
      },
    },
    orderBy: { createdAt: "desc" },
    include: {
      author: { select: { id: true, name: true, username: true, image: true } },
      comments: { include: { author: { select: { id: true, username: true, image: true, name: true } } }, orderBy: { createdAt: "asc" } },
      likes: { select: { userId: true } },
      _count: { select: { likes: true, comments: true } },
    },
  });

  const dbUserId = await getDbUserId();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-10 lg:gap-6">
      <div className="lg:col-span-6">
        <div className="mb-6">
          <div className="flex items-center gap-4 p-4 border rounded-xl">
            <Avatar className="w-24 h-24">
              <AvatarImage src={user.image ?? "/avatar.png"} />
            </Avatar>
            <div className="flex-1">
              <h2 className="text-2xl font-semibold">{user.name}</h2>
              <p className="text-sm text-muted-foreground">@{user.username}</p>
              {user.bio && <p className="mt-2 text-sm text-muted-foreground">{user.bio}</p>}

              <div className="mt-3 flex items-center space-x-4">
                <div>
                  <p className="font-medium">{user._count.posts}</p>
                  <p className="text-xs text-muted-foreground">Posts</p>
                </div>
                <div>
                  <p className="font-medium">{user._count.followers}</p>
                  <p className="text-xs text-muted-foreground">Followers</p>
                </div>
                <div>
                  <p className="font-medium">{user._count.following}</p>
                  <p className="text-xs text-muted-foreground">Following</p>
                </div>
                <div className="ml-auto">
                  {dbUserId && dbUserId !== user.id ? (
                    <FollowButton userId={user.id} />
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} dbUserId={dbUserId} />
          ))}
        </div>
      </div>

      <div className="hidden lg:block lg:col-span-4 sticky top-20">
        <SuggestedUser />
      </div>
    </div>
  );
}
