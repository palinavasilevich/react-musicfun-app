import { Card } from "../../../../shared/components/Card";
import { Button, Typography } from "../../../../shared/components";
import { EditIcon } from "../../../../shared/icons";
import type { SchemaPlaylistImagesOutputDto } from "../../../../shared/api/schema";
import noCoverImg from "../../../../assets/img/no-cover.png";
import cls from "./PlaylistCard.module.css";
import { DeletePlaylistButton } from "../DeletePlaylistButton";

type PlaylistCardPropsBase = {
  id: string;
  title: string;
  images: SchemaPlaylistImagesOutputDto;
  description: string | null;
};

type PlaylistCardWithActionButtons = PlaylistCardPropsBase & {
  isShowActionButtons: true;
  onEditPlaylist: (playlistId: string) => void;
};

type PlaylistCardWithoutActionButtons = PlaylistCardPropsBase & {
  isShowActionButtons?: false;
};

type PlaylistCardProps =
  | PlaylistCardWithActionButtons
  | PlaylistCardWithoutActionButtons;

export const PlaylistCard = (props: PlaylistCardProps) => {
  const { id, title, images, description, isShowActionButtons } = props;

  let imageSrc = images.main?.length ? images.main[0]?.url : undefined;

  if (!imageSrc) {
    imageSrc = noCoverImg;
  }
  return (
    <Card className={cls.card}>
      <div className={cls.image}>
        <img src={imageSrc} alt={title} aria-hidden />
      </div>
      <Typography variant="h3" className={cls.title}>
        {title}
      </Typography>
      <Typography variant="body3" className={cls.description}>
        {description}
      </Typography>

      {isShowActionButtons && (
        <div className={cls.actions}>
          <DeletePlaylistButton playlistId={id} className={cls.btn} />
          <Button
            onClick={() => props.onEditPlaylist(id)}
            variant="withIcon"
            className={cls.btn}
          >
            <EditIcon />
          </Button>
        </div>
      )}
    </Card>
  );
};
