import { Link } from "@tanstack/react-router";
import { Card } from "../../../../shared/components/Card";
import { Typography } from "../../../../shared/components";
import { DeletePlaylistButton } from "../DeletePlaylistButton";
import type { SchemaPlaylistImagesOutputDto } from "../../../../shared/api/schema";
import noCoverImg from "../../../../assets/img/no-cover.png";

import cls from "./PlaylistCard.module.css";

type PlaylistCardPropsBase = {
  id: string;
  title: string;
  images: SchemaPlaylistImagesOutputDto;
  description: string | null;
};

type PlaylistCardWithDeleteButton = PlaylistCardPropsBase & {
  isShowDeleteButton: true;
  onDeletePlaylist: (playlistId: string) => void;
};

type PlaylistCardWithoutDeleteButton = PlaylistCardPropsBase & {
  isShowDeleteButton?: false;
};

type PlaylistCardProps =
  | PlaylistCardWithDeleteButton
  | PlaylistCardWithoutDeleteButton;

export const PlaylistCard = (props: PlaylistCardProps) => {
  const { id, title, images, description, isShowDeleteButton } = props;

  let imageSrc = images.main?.length ? images.main[0]?.url : undefined;

  if (!imageSrc) {
    imageSrc = noCoverImg;
  }
  return (
    <Card as={Link} to={`/playlists/${id}`} className={cls.card}>
      <div className={cls.image}>
        <img src={imageSrc} alt={title} aria-hidden />
      </div>
      <Typography variant="h3" className={cls.title}>
        {title}
      </Typography>
      <Typography variant="body3" className={cls.description}>
        {description}
      </Typography>

      {isShowDeleteButton && (
        <DeletePlaylistButton
          playlistId={id}
          onDeleted={props.onDeletePlaylist}
        />
      )}
    </Card>
  );
};
