import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const MainRenders = () => {
    const [indexFolder, setIndexFolder] = useState(null);

    const [viewerOpen, setViewerOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState(0);

    const fotos = [
        {
            nombre: "CASA DP",
            imagenes: [
                "https://res.cloudinary.com/drfdelucd/image/upload/v1785607211/KG-002_Render_Exterior_1_v0ysiv.png",
                "https://res.cloudinary.com/drfdelucd/image/upload/v1785607210/KG-002_Render_Interior_3_sujm84.png",
                "https://res.cloudinary.com/drfdelucd/image/upload/v1785607211/KG-002_Render_Interior_2_hba1pp.png",
                "https://res.cloudinary.com/drfdelucd/image/upload/v1785607211/KG-002_Render_Interior_1_otll3k.png",
            ]
        },
        {
            nombre: "CASA GT",
            imagenes: [
                "https://res.cloudinary.com/drfdelucd/image/upload/v1785607373/GT_-_Interior_1_orgnq8.png",
                "https://res.cloudinary.com/drfdelucd/image/upload/v1785607373/GT_-_Exterior_1_jcjtch.png",
            ]
        },
        {
            nombre: "CASA LP",
            imagenes: [
                "https://res.cloudinary.com/drfdelucd/image/upload/v1785607409/LP_EXT_2_eikrqb.png",
                "https://res.cloudinary.com/drfdelucd/image/upload/v1785607409/LP_INT_1_zqeokb.png",
                "https://res.cloudinary.com/drfdelucd/image/upload/v1785607410/LP_INT_2_yq6sl1.png",
                "https://res.cloudinary.com/drfdelucd/image/upload/v1785607411/LP_EXT_1_ebedji.png",
            ]
        },
        {
            nombre: "CASA OL",
            imagenes: [
                "https://res.cloudinary.com/drfdelucd/image/upload/v1785607463/IMG_20210514_095605786_HDR_tlssub.jpg",
                "https://res.cloudinary.com/drfdelucd/image/upload/v1785607460/IMG_20210514_094259992_HDR_uawy6u.jpg",
                "https://res.cloudinary.com/drfdelucd/image/upload/v1785607461/IMG_20210514_125147008_HDR_qkr3tz.jpg",
                "https://res.cloudinary.com/drfdelucd/image/upload/v1785607462/IMG_20210514_095921206_HDR_fjm6eh.jpg",
                "https://res.cloudinary.com/drfdelucd/image/upload/v1785607458/IMG_20210514_094356408_HDR_cud6sk.jpg",
                "https://res.cloudinary.com/drfdelucd/image/upload/v1785607465/IMG_20210514_093737597_HDR_vciakg.jpg",
            ]
        },
        {
            nombre: "CASA PL",
            imagenes: [
                "https://res.cloudinary.com/drfdelucd/image/upload/v1785607516/KG_EXT_1_uvemjg.png",
                "https://res.cloudinary.com/drfdelucd/image/upload/v1785607518/KG_INT_4_s8tvgn.png",
                "https://res.cloudinary.com/drfdelucd/image/upload/v1785607518/KG_INT_3_tafifu.png",
                "https://res.cloudinary.com/drfdelucd/image/upload/v1785607517/KG_INT_2_jh0iea.png",
            ]
        },
        {
            nombre: "CONFORME A OBRA",
            imagenes: [
                "https://res.cloudinary.com/drfdelucd/image/upload/v1785684854/FACHADA_qrvh5n.png",
                "https://res.cloudinary.com/drfdelucd/image/upload/v1785684854/PLANTA_dg6orz.png",
                "https://res.cloudinary.com/drfdelucd/image/upload/v1785684854/PB_roqtkr.png",
                "https://res.cloudinary.com/drfdelucd/image/upload/v1785684854/CORTE_it7jfc.png"
            ]
        }, {
            nombre: "CASA LC",
            imagenes: [
                "https://res.cloudinary.com/drfdelucd/image/upload/v1785684956/LC_INT_1_xqt9ip.png",
                "https://res.cloudinary.com/drfdelucd/image/upload/v1785684957/LC_EXT_1_h2bkh3.png",
                "https://res.cloudinary.com/drfdelucd/image/upload/v1785684957/LC_INT_2_vo1nuh.png",
                "https://res.cloudinary.com/drfdelucd/image/upload/v1785684957/LC_EXT_2_bbajcg.png",
            ]
        },
        {
            nombre: "PROYECTO OB",
            imagenes: [
                "https://res.cloudinary.com/drfdelucd/image/upload/v1785685009/OF_4_cc5yul.png  ",
                "https://res.cloudinary.com/drfdelucd/image/upload/v1785685009/OF_3_vuzmeq.png",
                "https://res.cloudinary.com/drfdelucd/image/upload/v1785685010/OF_1_riuti0.png",
                "https://res.cloudinary.com/drfdelucd/image/upload/v1785685010/OF_2_h4e27l.png",
            ]
        },
        {
            nombre: "SENGER",
            imagenes: [
                "https://res.cloudinary.com/drfdelucd/image/upload/v1785685060/SENGUER_EXT_2_h5zkqg.png",
                "https://res.cloudinary.com/drfdelucd/image/upload/v1785685061/SENGUER_EXT_1_melvco.png",
                "https://res.cloudinary.com/drfdelucd/image/upload/v1785685061/ACONQUIJA_EXT_1_epuwkz.png",
                "https://res.cloudinary.com/drfdelucd/image/upload/v1785685061/SENGUER_INT_1_nha8me.png",
            ]
        }
    ];

    const nextImage = () => {
        setCurrentImage((prev) =>
            prev === fotos[indexFolder].imagenes.length - 1 ? 0 : prev + 1
        );
    };

    const prevImage = () => {
        setCurrentImage((prev) =>
            prev === 0 ? fotos[indexFolder].imagenes.length - 1 : prev - 1
        );
    };

    // Flechas del teclado + ESC
    useEffect(() => {
        if (!viewerOpen) return;

        const handleKeyDown = (e) => {
            if (e.key === "Escape") setViewerOpen(false);
            if (e.key === "ArrowRight") nextImage();
            if (e.key === "ArrowLeft") prevImage();
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [viewerOpen, currentImage, indexFolder]);

    return (
        <div className="main-renders">

            <AnimatePresence mode="wait">

                {indexFolder === null ? (

                    <motion.div
                        key="galerias"
                        className="image-gallery"
                        initial={{ opacity: 0, scale: .95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: .95 }}
                        transition={{ duration: .35 }}
                    >

                        {fotos.map((item, index) => (

                            <motion.div
                                key={index}
                                className="gallery-item"
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: .98 }}
                                onClick={() => setIndexFolder(index)}
                            >
                                

                                <img
                                    src={item.imagenes[0]}
                                    alt={item.nombre}
                                />

                                <div className="gallery-overlay">
                                    <div>
                                        <h2>{item.nombre}</h2>
                                        <p>Ver proyecto</p>
                                    </div>
                                </div>

                            </motion.div>

                        ))}

                    </motion.div>

                ) : (

                    <motion.div
                        key={`galeria-${indexFolder}`}
                        className="selected-gallery"
                        initial={{ opacity: 0, scale: .95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: .95 }}
                        transition={{ duration: .35 }}
                    >

                        <p className="gallery-title">
                            {fotos[indexFolder].nombre}
                        </p>

                        <button
                            className="btn-back"
                            onClick={() => setIndexFolder(null)}
                        >
                            ← Volver
                        </button>

                        <div className="selected-images">

                            <AnimatePresence>

                                {fotos[indexFolder].imagenes.map((img, index) => (

                                    <motion.img
                                        key={img}
                                        src={img}
                                        alt=""
                                        onClick={() => {
                                            setCurrentImage(index);
                                            setViewerOpen(true);
                                        }}
                                        initial={{
                                            opacity: 0,
                                            y: 20,
                                            scale: .9
                                        }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                            scale: 1
                                        }}
                                        transition={{
                                            delay: index * .08,
                                            duration: .35
                                        }}
                                    />

                                ))}

                            </AnimatePresence>

                        </div>

                    </motion.div>

                )}

            </AnimatePresence>

            <AnimatePresence>

                {viewerOpen && (

                    <motion.div
                        className="lightbox"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setViewerOpen(false)}
                    >

                        <button
                            className="prev"
                            onClick={(e) => {
                                e.stopPropagation();
                                prevImage();
                            }}
                        >
                            ❮
                        </button>

                        <motion.img
                            key={currentImage}
                            src={fotos[indexFolder].imagenes[currentImage]}
                            alt=""
                            onClick={(e) => e.stopPropagation()}
                            initial={{ opacity: 0, scale: .95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: .95 }}
                            transition={{ duration: .2 }}
                        />

                        <button
                            className="next"
                            onClick={(e) => {
                                e.stopPropagation();
                                nextImage();
                            }}
                        >
                            ❯
                        </button>

                    </motion.div>

                )}

            </AnimatePresence>

        </div>
    );
};

export default MainRenders;