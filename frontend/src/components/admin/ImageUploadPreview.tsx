//este componente lida com a pré-visualização de imagens salvas e o recorte de novas imagens antes do upload.
import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import getCroppedImg from '../../utils/cropImage';

const API_URL = import.meta.env.VITE_API_URL;

interface ImageUploadPreviewProps {
  label: string;
  imagensSalvas: string[];
  arquivosNovos: Blob[];
  onChangeNovos: (files: Blob[]) => void;
}

const ImageUploadPreview: React.FC<ImageUploadPreviewProps> = ({ label, imagensSalvas, arquivosNovos, onChangeNovos }) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

  const onCropComplete = useCallback((_croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImageSrc(reader.result as string);
      };
      // resetamos o input caso queira adicionar a mesma de novo
      e.target.value = '';
    }
  };

  const handleCropSave = async () => {
    try {
      if (!imageSrc || !croppedAreaPixels) return;
      const croppedBlob = await getCroppedImg(imageSrc, croppedAreaPixels);
      onChangeNovos([...arquivosNovos, croppedBlob]);
      setImageSrc(null); // fecha o modal
    } catch (e) {
      console.error(e);
    }
  };

  const removerNovo = (index: number) => {
    const novos = [...arquivosNovos];
    novos.splice(index, 1);
    onChangeNovos(novos);
  };

  return (
    <div className="bg-white shadow-sm border border-gray-200 rounded-[10px] overflow-hidden relative">
      <div className="px-4 py-3 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
        <h3 className="font-semibold text-gray-700 text-sm">{label}</h3>
        <span className="text-xs text-gray-400">{imagensSalvas.length + arquivosNovos.length} imagens no total</span>
      </div>
      <div className="p-4">
        
        {/* Lista de Imagens Salvas (do DB) */}
        {imagensSalvas.length > 0 && (
          <div className="mb-4">
            <h4 className="text-xs font-semibold text-gray-500 mb-2 uppercase">Já Salvas (No Servidor)</h4>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {imagensSalvas.map((imgUrl, i) => (
                <div key={i} className="min-w-[100px] w-[100px] shrink-0 relative">
                  <img
                      src={`${API_URL}/uploads/${imgUrl}`}
                      alt={`${label} ${i}`}
                      className="w-full h-[75px] rounded-lg object-cover border border-gray-200"
                  />
                </div>
              ))}
            </div>
            <p className="text-xs text-red-400 mt-1">As imagens antigas serão substituídas ou ignoradas dependendo da lógica do Controller, mas o foco agora é fazer upload de um array novo.</p>
          </div>
        )}

        {/* Lista de Novas Imagens Prontas para Envio */}
        {arquivosNovos.length > 0 && (
          <div className="mb-4">
            <h4 className="text-xs font-semibold text-gray-500 mb-2 uppercase">Novas para Enviar</h4>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {arquivosNovos.map((blob, i) => (
                <div key={i} className="min-w-[100px] w-[100px] shrink-0 relative group">
                  <img
                      src={URL.createObjectURL(blob)}
                      alt={`Novo ${i}`}
                      className="w-full h-[75px] rounded-lg object-cover border border-green-400"
                  />
                  <button type="button" onClick={() => removerNovo(i)} className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">X</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Botão de Adicionar (Abre modal de crop após selecionar arquivo) */}
        <div className="relative">
          <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-[10px] file:border-0 file:text-sm file:font-semibold file:bg-[#512B3C] file:text-white hover:file:bg-[#3D202D] file:transition-colors file:cursor-pointer"
          />
        </div>
      </div>

      {/* Modal de Crop */}
      {imageSrc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="bg-white rounded-xl w-[90vw] md:w-[600px] overflow-hidden flex flex-col">
            <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
              <h3 className="font-bold text-gray-800">Recortar Imagem (Proporção 4:3 para Hero)</h3>
              <button type="button" onClick={() => setImageSrc(null)} className="text-gray-500 font-bold hover:text-red-500">X</button>
            </div>
            <div className="relative w-full h-[400px] bg-gray-900">
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={4 / 3}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </div>
            <div className="p-4 flex gap-4 bg-gray-50 border-t border-gray-200">
              <button type="button" onClick={() => setImageSrc(null)} className="px-4 py-2 bg-gray-300 rounded font-semibold text-sm">Cancelar</button>
              <button type="button" onClick={handleCropSave} className="flex-1 px-4 py-2 bg-[#512B3C] text-white rounded font-bold text-sm">Confirmar e Recortar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploadPreview;
