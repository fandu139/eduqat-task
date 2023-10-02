import { ReactNode, Ref, memo } from "react";
import Image from "next/image";

import IconVideo from "@/assets/icons/video.svg";
import IconLocation from "@/assets/icons/location.svg";
import IconMoveDot from "@/assets/icons/move-dot.svg";
import IcoClock from "@/assets/icons/clock.svg";
import IconShowList from "@/assets/icons/show-list.svg";
import IconDelete from "@/assets/icons/trash.svg";
import IconDownload from "@/assets/icons/download.svg";

import Text from "@/app/atom/Text";
import convertDate from "@/app/utils/date";

interface CardProps {
  id: string;
  title: string;
  type: string;
  date: string;
  duration: number;
  handleDeleteLesson: (id) => void;
}

const ItemList = ({ id, title, type, date , duration, handleDeleteLesson } : CardProps) => {
  return (
    <div key={id} className="d-flex justify-content-between">
      <div className="d-flex flex-row">
        <div className="p-2">
          <Image
            src={IconMoveDot}
            alt="Icon Move"
            className="dark:invert"
            width={40}
            height={24}
            priority
          />
        </div>
        <div className="p-2">
          <Image
            src={type === 'video' ? IconVideo : IconLocation}
            alt="Icon Video"
            className="dark:invert"
            width={40}
            height={24}
            priority
          />
        </div>
        <div className="p-2"><Text>{title}</Text></div>
        <div className="p-2"><Text color="primary">Required</Text></div>
        <div className="p-2"><Text>Previewable</Text></div>
      </div>
      <div className="d-flex flex-row">
        <div className="p-2">
          <Image
            src={IcoClock}
            alt="Icon Datetime"
            className="dark:invert"
            width={40}
            height={24}
            priority
          />
        </div>
        <div className="p-2"><Text>{convertDate(date)}</Text></div>
        <div className="p-2">
          <Image
            src={IcoClock}
            alt="Icon Duration"
            className="dark:invert"
            width={40}
            height={24}
            priority
          />
        </div>
        <div className="p-2"><Text>{`${duration} Min`}</Text></div>
        <div className="p-2">
          <Image
            src={IconDownload}
            alt="Icon Download"
            className="dark:invert"
            width={40}
            height={24}
            priority
          />
        </div>
        <div className="p-2"><Text>Downloadable</Text></div>
        <div className="p-2">
          <Image
            src={IconShowList}
            alt="Icon Show List"
            className="dark:invert"
            width={40}
            height={24}
            priority
          />
        </div>
        <div className="p-2" onClick={() => handleDeleteLesson(id)}>
          <Image
            src={IconDelete}
            alt="Icon Show List"
            className="dark:invert"
            width={40}
            height={24}
            priority
          />
        </div>
      </div>
    </div>
  )
};

export default ItemList;
