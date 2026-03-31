import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/formulario/Input';
import Button from '../../components/formulario/Button';
import useFlashMessage from '../../hooks/useFlashMessage';

const API_URL = import.meta.env.VITE_API_URL;

const CriarPostagem = () => {
    const navigate = useNavigate();
    const { setFlashMessage } = useFlashMessage();

    // tipo do registro: 'texto' ou 'galeria'
    const [tipo, setTipo] = useState<'texto' | 'galeria'>('texto');

    // campos comuns
    const [titulo, setTitulo] = useState('');
    const [slug, setSlug] = useState('');

    // campos específicos
    const [descricao, setDescricao] = useState('');  // apenas texto
    const [resumo, setResumo] = useState('');         // apenas galeria

    // arquivos de imagem (multer)
    const [thumb, setThumb] = useState<File | null>(null);
    const [galeria, setGaleria] = useState<File[]>([]);

    // gera o slug automaticamente a partir do título
    const gerarSlug = () => {
        const novoSlug = titulo
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '') // remove acentos
            .replace(/[^a-z0-9\s-]/g, '')   // remove caracteres especiais
            .trim()
            .replace(/\s+/g, '-');           // espaços viram hifens
        setSlug(novoSlug);
    };

    // lida com upload de galeria (múltiplos arquivos)
    const handleGaleriaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setGaleria(Array.from(e.target.files));
        }
    };

    // submissão do formulário
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('tipo', tipo);
            formData.append('titulo', titulo);
            formData.append('slug', slug);

            if (tipo === 'texto') {
                formData.append('descricao', descricao);
            } else {
                formData.append('resumo', resumo);
            }

            // anexa os arquivos de imagem
            if (thumb) {
                formData.append('thumb', thumb);
            }
            if (tipo === 'galeria') {
                galeria.forEach((file) => {
                    formData.append('galeria', file);
                });
            }

            const token = localStorage.getItem('token');

            const resposta = await fetch(`${API_URL}/registros/criar`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            const dados = await resposta.json();

            if (!resposta.ok) {
                throw new Error(dados.message || 'Erro ao criar registro.');
            }

            setFlashMessage('Registro criado com sucesso!', 'success');
            navigate('/');

        } catch (error) {
            setFlashMessage(error instanceof Error ? error.message : String(error), 'error');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Criar Novo Registro</h1>

                {/* seletor de tipo */}
                <div className="flex gap-3 mb-6">
                    <button
                        type="button"
                        onClick={() => setTipo('texto')}
                        className={`px-5 py-2 rounded-[10px] font-semibold text-sm transition-colors ${tipo === 'texto'
                            ? 'bg-[#512B3C] text-white'
                            : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
                            }`}
                    >
                        Texto
                    </button>
                    <button
                        type="button"
                        onClick={() => setTipo('galeria')}
                        className={`px-5 py-2 rounded-[10px] font-semibold text-sm transition-colors ${tipo === 'galeria'
                            ? 'bg-[#512B3C] text-white'
                            : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
                            }`}
                    >
                        Galeria
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                    {/* título + slug */}
                    <div className="bg-white p-0 shadow-sm border border-gray-200 rounded-[10px] overflow-hidden">
                        <Input
                            type="text"
                            id="titulo"
                            placeholder="adicionar título"
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                            onBlur={gerarSlug}
                            required
                        />
                        <div className="bg-gray-50 px-4 py-2 border-t border-gray-200 text-sm text-gray-500 flex items-center">
                            <span>Link Permanente:</span>
                            <input
                                type="text"
                                value={slug}
                                onChange={(e) => setSlug(e.target.value)}
                                className="ml-2 bg-transparent border-b border-gray-300 focus:border-[#a5002c] outline-none text-gray-700 w-1/2 text-sm"
                            />
                        </div>
                    </div>

                    {/* campo específico: descricao (texto) ou resumo (galeria) */}
                    {tipo === 'texto' ? (
                        <div className="bg-white shadow-sm border border-gray-200 rounded-[10px] overflow-hidden">
                            <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
                                <h2 className="font-semibold text-gray-700">Descrição Detalhada</h2>
                            </div>
                            <div className="p-4">
                                <textarea
                                    value={descricao}
                                    onChange={(e) => setDescricao(e.target.value)}
                                    rows={10}
                                    required
                                    className="w-full border border-gray-300 p-3 rounded-[10px] focus:border-[#a5002c] outline-none resize-none"
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white shadow-sm border border-gray-200 rounded-[10px] overflow-hidden">
                            <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
                                <h2 className="font-semibold text-gray-700">Resumo</h2>
                            </div>
                            <div className="p-4">
                                <textarea
                                    value={resumo}
                                    onChange={(e) => setResumo(e.target.value)}
                                    rows={3}
                                    required
                                    className="w-full border border-gray-300 p-3 rounded-[10px] focus:border-[#a5002c] outline-none resize-none"
                                />
                            </div>
                        </div>
                    )}

                    {/* upload de imagem de capa */}
                    <div className="bg-white shadow-sm border border-gray-200 rounded-[10px] overflow-hidden">
                        <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
                            <h2 className="font-semibold text-gray-700">
                                Imagem de Capa {tipo === 'galeria' && <span className="text-red-500">*</span>}
                            </h2>
                        </div>
                        <div className="p-4">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setThumb(e.target.files?.[0] || null)}
                                required={tipo === 'galeria'}
                                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-[10px] file:border-0 file:text-sm file:font-semibold file:bg-[#512B3C] file:text-white hover:file:bg-[#3D202D] file:transition-colors file:cursor-pointer"
                            />
                        </div>
                    </div>

                    {/* upload de galeria de imagens */}
                    {tipo === 'galeria' && (
                        <div className="bg-white shadow-sm border border-gray-200 rounded-[10px] overflow-hidden">
                            <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
                                <h2 className="font-semibold text-gray-700">
                                    Galeria de Imagens <span className="text-red-500">*</span>
                                </h2>
                            </div>
                            <div className="p-4">
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleGaleriaChange}
                                    required
                                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-[10px] file:border-0 file:text-sm file:font-semibold file:bg-[#512B3C] file:text-white hover:file:bg-[#3D202D] file:transition-colors file:cursor-pointer"
                                />
                                {galeria.length > 0 && (
                                    <p className="mt-2 text-sm text-gray-500">{galeria.length} arquivo(s) selecionado(s)</p>
                                )}
                            </div>
                        </div>
                    )}

                    <Button type="submit">
                        Publicar Registro
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default CriarPostagem;
