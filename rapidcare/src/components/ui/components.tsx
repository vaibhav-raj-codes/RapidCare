import React from 'react';

interface EmergencyCardProps {
    title: string;
    subtitle: string;
    icon: string;
    imageUrl: string;
    altText: string;
    onClick?: () => void;
}

export const EmergencyCard: React.FC<EmergencyCardProps> = ({ title, subtitle, icon, imageUrl, altText, onClick }) => {
    return (
        <div onClick={onClick} className="group relative h-48 w-full overflow-hidden rounded-xl bg-rapid-surface-dark cursor-pointer shadow-md border border-white/10">
            <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105 opacity-60"
                data-alt={altText}
                style={{ backgroundImage: `url('${imageUrl}')` }}
            >
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent"></div>
            <div className="absolute inset-0 flex items-center p-6">
                <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm shrink-0">
                        <span className="material-symbols-outlined text-white text-2xl">{icon}</span>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold leading-tight text-white">{title}</h3>
                        <p className="text-sm text-gray-300 mt-1">{subtitle}</p>
                    </div>
                </div>
            </div>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="material-symbols-outlined text-white/50 text-3xl">chevron_right</span>
            </div>
        </div>
    );
};

export default EmergencyCard;