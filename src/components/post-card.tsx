import { ColorBadge } from "@/components/color-badge";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { Post } from "@/types/post";
import { Calendar, Clock, ExternalLink } from "lucide-react";

type PostCardProps = {
  post: Post;
};

export function PostCard({ post }: PostCardProps) {
  return (
    <Card className="w-full rounded-lg">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <CardTitle className="text-xl">{post.title}</CardTitle>
          <Button variant="outline" size="sm" asChild>
            <a href={post.link} target="_blank" rel="noopener noreferrer">
              View Post <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
        <CardDescription>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-2 flex-wrap">
            <ColorBadge color="blue" icon={Calendar}>
              Created: {post.date_gmt && formatDate(post.date_gmt)}
            </ColorBadge>
            <ColorBadge color="purple" icon={Clock}>
              Modified: {post.modified_gmt && formatDate(post.modified_gmt)}
            </ColorBadge>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable
          data={post.contentWords}
          title="Content Word Counts"
          badgeColor="emerald"
          searchPlaceholder="Search content words..."
        />
        <br />
        <DataTable
          data={post.excerptWords}
          title="Excerpt Word Counts"
          badgeColor="amber"
          searchPlaceholder="Search excerpt words..."
        />
      </CardContent>
    </Card>
  );
}
