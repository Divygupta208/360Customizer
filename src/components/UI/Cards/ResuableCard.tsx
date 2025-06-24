import React from "react";
import CustomButton from "../Button/Button";
import styles from "../../modules/ProfileCard.module.css";
import type { ProductCardData, ProfileCardData } from "../../../types/Card";

type ProductCardProps = {
  type: "product";
  data: ProductCardData;
  onClick: () => void;
};

type ProfileCardProps = {
  type: "profile";
  data: ProfileCardData;
  onClick: () => void;
};

type CardProps = ProductCardProps | ProfileCardProps;

const ReusableCard: React.FC<CardProps> = ({ type, data, onClick }) => {
  if (type === "product") {
    return (
      <div
        onClick={onClick}
        className="relative bg-white flex flex-col justify-between text-black border-2 border-black/10 rounded-2xl shadow-lg min-h-[380px] max-w-[300px] min-w-[300px] p-4 sm:w-[40vw] lg:w-[20vw] transition-transform hover:scale-[1.03] hover:shadow-2xl duration-300"
      >
        {data.badge && (
          <div className="absolute top-1 right-1 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded shadow-md z-10">
            {data.badge}
          </div>
        )}

        <div className="aspect-[4/3] w-full overflow-hidden rounded-md">
          <img
            className="object-contain w-full h-full"
            src={data.image}
            alt={data.title}
          />
        </div>

        <div className="flex flex-col gap-2 mt-3">
          <h6 className="font-bold text-base truncate">{data.title}</h6>
          <p className="text-sm text-gray-600 truncate">{data.description}</p>
          <div className="bg-blue-100 text-blue-700 w-fit px-2 py-1 rounded text-sm font-medium">
            ${data.price}
          </div>

          <div className="flex items-center justify-between mt-3">
            <div className="flex gap-2">
              {data.rating && (
                <div className="text-slate-400 text-sm font-semibold">
                  ({data.rating.count})
                </div>
              )}
              {data.colors?.map((color) => (
                <div
                  key={color}
                  className="w-4 h-4 rounded-full border border-gray-400"
                  style={{ backgroundColor: color }}
                ></div>
              ))}
            </div>
            <CustomButton label="Buy Now" className="bg-black text-white p-2" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className={styles["card-container"]}>
      <div className={styles.card}>
        <div className={styles["top-container"]}>
          <img
            src={data.profilePicture}
            alt={data.name}
            className={styles["profile-image"]}
          />
        </div>
        <div className={styles["bottom-container"]}>
          <h1 className={styles["user-name"]}>{data.name}</h1>
          <h3 className={styles["user-role"]}>
            {data.role} @ {data.organisation}
          </h3>
          <p className={styles.bio}>{data.bio}</p>

          <div className={styles.handles}>
            <div className={styles.links}>
              {data.socialLinks.map((link) => (
                <a
                  key={link.social}
                  href={link.link}
                  className={styles.linkItem}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.logo}
                </a>
              ))}
            </div>
            <button className={styles.button}>View Profile</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReusableCard;
