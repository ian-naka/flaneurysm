import React from 'react';

const API_URL = import.meta.env.VITE_API_URL;

interface ImageUploadPreviewProps {
  label: string;
  imagemAtual: string | null;
  onChange: (file: File | null) => void;
}

const ImageUploadPreview: React.FC<ImageUploadPreviewProps> = ({ label, imagemAtual, onChange }) => {
  return (
    <div className="bg-white shadow-sm border border-gray-200 rounded-[10px] overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
            <h3 className="font-semibold text-gray-700 text-sm">{label}</h3>
        </div>
        <div className="p-4">
            {imagemAtual && (
                <div className="mb-3">
                    <img
                        src={`${API_URL}/uploads/${imagemAtual}`}
                        alt={label}
                        className="w-full max-w-[200px] h-auto rounded-lg object-cover border border-gray-200"
                    />
                    <p className="text-xs text-gray-400 mt-1">Imagem atual</p>
                </div>
            )}
            <input
                type="file"
                accept="image/*"
                onChange={(e) => onChange(e.target.files?.[0] || null)}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-[10px] file:border-0 file:text-sm file:font-semibold file:bg-[#512B3C] file:text-white hover:file:bg-[#3D202D] file:transition-colors file:cursor-pointer"
            />
        </div>
    </div>
  );
};

export default ImageUploadPreview;
