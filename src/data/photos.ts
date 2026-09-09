import masjid0 from "@/assets/masjid-0.jpg.asset.json";
import masjid1 from "@/assets/masjid-1.jpg.asset.json";
import masjid2 from "@/assets/masjid-2.jpg.asset.json";
import masjid3 from "@/assets/masjid-3.jpg.asset.json";
import masjid4 from "@/assets/masjid-4.jpg.asset.json";
import masjid5 from "@/assets/masjid-5.jpg.asset.json";
import feed11 from "@/assets/feeding-11.jpg.asset.json";
import feed12 from "@/assets/feeding-12.jpg";
import feed13 from "@/assets/feeding-13.jpg";
import feed14 from "@/assets/feeding-14.jpg";
import feed15 from "@/assets/feeding-15.jpg";
import qurban16 from "@/assets/qurban-16.jpg.asset.json";
import qurban17 from "@/assets/qurban-17.jpg.asset.json";
import qurban18 from "@/assets/qurban-18.jpg.asset.json";
import qurban19 from "@/assets/qurban-19.jpg.asset.json";
import water07 from "@/assets/water-0007.jpg.asset.json";
import water08 from "@/assets/water-0008.jpg.asset.json";
import water20 from "@/assets/water-0020.jpg.asset.json";
import water21 from "@/assets/water-0021.jpg.asset.json";
import masjidN1 from "@/assets/masjid-n0001.jpg.asset.json";
import masjidN2 from "@/assets/masjid-n0002.jpg.asset.json";

export const waterPhotos = [water20.url, water07.url, water21.url, water08.url];

export const masjidPhotos = [
  masjid4.url,
  masjidN1.url,
  masjid5.url,
  masjid0.url,
  masjidN2.url,
  masjid1.url,
  masjid2.url,
  masjid3.url,
];

export const feedingPhotos = [feed13, feed11.url, feed12, feed14, feed15];

export const qurbanPhotos = [qurban16.url, qurban19.url, qurban17.url, qurban18.url];

export const allPhotos = [...feedingPhotos, ...masjidPhotos, ...qurbanPhotos];
