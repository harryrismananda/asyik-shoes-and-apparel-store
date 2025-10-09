import Image from "next/image";

const EcommerceInfo = () => {
  return (
    <div className="w-full bg-white py-16">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner Image */}
        <div className="relative w-full h-64 sm:h-80 lg:h-96 mb-12 rounded-lg overflow-hidden shadow-lg">
          <Image
            src="https://thumbor.sirclocdn.com/unsafe/x/filters:format(webp):quality(80)/https://bo.asics.co.id/media/wysiwyg/cms/banner_2x.png"
            alt="about-asics"
            fill
            className="object-cover"
            unoptimized
          />
        </div>

        {/* Content Sections */}
        <div className="space-y-12">
          {/* Mission Section */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold uppercase tracking-wide mb-6 text-gray-900">
              MISI KAMI
            </h2>
            <p className="text-base lg:text-lg text-gray-700 leading-relaxed">
              ASYIK telah mengembangkan alas kaki dan pakaian olahraga selama
              lebih dari 50 tahun. Saat ini, inovasi telah menjadi kunci
              pengenalan filosofi desain kami yang telah merevolusi dunia
              olahraga. Di pusat penelitian dan pengembangan kami di Kobe, Jepang,
              kami memiliki kerja sama yang erat dengan atlet pria dan wanita.
              Melalui pendekatan ilmiah kami, kami telah berupaya untuk
              menciptakan solusi produk olahraga yang sangat inovatif yang
              diandalkan oleh pelanggan kami. Teknologi, seperti sistem bantalan
              inti GEL dan Flytefoam terkenal karena memungkinkan alas kaki dan
              pakaian yang paling nyaman dan meningkatkan kinerja di pasar, untuk
              atlet dan konsumen aktif.
            </p>
          </div>

          {/* Philosophy Section */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold uppercase tracking-wide mb-6 text-gray-900">
              FILOSOFI
            </h2>
            <p className="text-base lg:text-lg text-gray-700 leading-relaxed">
              Pendekatan inovatif ini, berdasarkan penelitian ilmiah dan
              kolaborasi dengan para atlet, telah menjadi tujuan utama kami:
              Menghasilkan solusi dan teknologi produk olahraga yang inovatif
              untuk membantu para atlet dan konsumen aktif mencapai tujuan mereka.
              Nama perusahaan kami berasal dari singkatan frase Latin &quot;Anima Sana
              In Corpore Sano&quot;, yang berarti &quot;Pikiran yang Sehat Dalam Tubuh yang
              Sehat&quot;, yang telah membentuk takdir kami. Hal ini merupakan gaung
              konsistensi kami, inovasi kami, komitmen kami terhadap kualitas dan
              keaslian kami
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EcommerceInfo;
