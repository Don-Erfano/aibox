export interface LikeAndDislikeProps {
  numOfLikes?: number;
  numOfDislikes?: number;
  isAdmin?: boolean;
  disabled?: boolean;
  initialIsLiked?: boolean;
  initialIsDisliked?: boolean;
  onLike?: () => void;
  onDislike?: () => void;
}
