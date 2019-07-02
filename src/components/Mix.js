import React from 'react';
import { Link } from 'react-router-dom';
import PlayButton from './PlayButton';
import PlayMix from './PlayMix'

export default function Mix({ name, pictures, slug, id }) {
    return (
        <div className="aspect-ratio aspect-ratio--3x4 pointer bg-black bg-center" style={{ backgroundImage: `url(${pictures.extra_large})` }}>
            <div className="ph3 pv4 aspect-ratio--object mix-overlay">
                <div className="flex flex-column relative z-2">
                    <h1 className="f4 f3-l mv0 white ttu biryani pr2 lh-title">{name}</h1>
                </div>

                <Link to={`/show/${slug}`} className='absolute absolute--fill z-3' />
                <PlayMix id={id} className="absolute bottom-1 left-1 z-5 flex items-left pointer">
                    <PlayButton />
                </PlayMix>
            </div>
        </div >
    )
};