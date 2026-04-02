import React, { useState, useEffect } from 'react';
import Input from '../../components/formulario/Input';
import Button from '../../components/formulario/Button';
import useFlashMessage from '../../hooks/useFlashMessage';
import api from '../../services/api';
import ImageUploadPreview from '../../components/admin/ImageUploadPreview';


interface DashboardConfigData {
    heroTitulo: string;
    heroSubtitulo: string;
    heroImagem: string | null;
    highlightTitulo: string;
    highlightImagem: string | null;
    card1Titulo: string;
    card1Imagem: string | null;
    card2Titulo: string;
    card2Imagem: string | null;
}

const ConfiguracoesDashboard: React.FC = () => {
    const { setFlashMessage } = useFlashMessage();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // campos de texto
    const [heroTitulo, setHeroTitulo] = useState('');
    const [heroSubtitulo, setHeroSubtitulo] = useState('');
    const [highlightTitulo, setHighlightTitulo] = useState('');
    const [card1Titulo, setCard1Titulo] = useState('');
    const [card2Titulo, setCard2Titulo] = useState('');

    // arquivos de imagem
    const [heroImagem, setHeroImagem] = useState<File | null>(null);
    const [highlightImagem, setHighlightImagem] = useState<File | null>(null);
    const [card1Imagem, setCard1Imagem] = useState<File | null>(null);
    const [card2Imagem, setCard2Imagem] = useState<File | null>(null);

    // previews das imagens já salvas
    const [heroImagemAtual, setHeroImagemAtual] = useState<string | null>(null);
    const [highlightImagemAtual, setHighlightImagemAtual] = useState<string | null>(null);
    const [card1ImagemAtual, setCard1ImagemAtual] = useState<string | null>(null);
    const [card2ImagemAtual, setCard2ImagemAtual] = useState<string | null>(null);

    // busca as configurações atuais ao montar o componente
    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const resposta = await api.get('/dashboard-config');
                const dados: DashboardConfigData = resposta.data;
                    setHeroTitulo(dados.heroTitulo || '');
                    setHeroSubtitulo(dados.heroSubtitulo || '');
                    setHighlightTitulo(dados.highlightTitulo || '');
                    setCard1Titulo(dados.card1Titulo || '');
                    setCard2Titulo(dados.card2Titulo || '');
                    setHeroImagemAtual(dados.heroImagem);
                    setHighlightImagemAtual(dados.highlightImagem);
                    setCard1ImagemAtual(dados.card1Imagem);
                    setCard2ImagemAtual(dados.card2Imagem);
            } catch (error) {
                console.error('Erro ao buscar configurações:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchConfig();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const formData = new FormData();
            formData.append('heroTitulo', heroTitulo);
            formData.append('heroSubtitulo', heroSubtitulo);
            formData.append('highlightTitulo', highlightTitulo);
            formData.append('card1Titulo', card1Titulo);
            formData.append('card2Titulo', card2Titulo);

            if (heroImagem) formData.append('heroImagem', heroImagem);
            if (highlightImagem) formData.append('highlightImagem', highlightImagem);
            if (card1Imagem) formData.append('card1Imagem', card1Imagem);
            if (card2Imagem) formData.append('card2Imagem', card2Imagem);

            const resposta = await api.put('/dashboard-config', formData);
            const dados = resposta.data;

            setFlashMessage('Configurações salvas com sucesso!', 'success');

            // atualiza as previews das imagens que acabaram de ser enviadas
            if (heroImagem) setHeroImagemAtual(dados.config?.heroImagem || null);
            if (highlightImagem) setHighlightImagemAtual(dados.config?.highlightImagem || null);
            if (card1Imagem) setCard1ImagemAtual(dados.config?.card1Imagem || null);
            if (card2Imagem) setCard2ImagemAtual(dados.config?.card2Imagem || null);

            // limpa os inputs de arquivo após o sucesso
            setHeroImagem(null);
            setHighlightImagem(null);
            setCard1Imagem(null);
            setCard2Imagem(null);

        } catch (error: any) {
            const mensagem = error.response?.data?.message || error.message || String(error);
            setFlashMessage(mensagem, 'error');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="w-8 h-8 border-2 border-[#512B3C] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }



    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">

            {/* Seção: Hero */}
            <div className="border border-gray-200 rounded-[14px] overflow-hidden">
                <div className="px-5 py-3 bg-[#512B3C]">
                    <h2 className="text-white font-bold text-sm uppercase tracking-wider">Seção Hero (Topo)</h2>
                </div>
                <div className="p-5 flex flex-col gap-4 bg-white">
                    <div>
                        <label htmlFor="heroTitulo" className="block text-sm font-medium text-gray-700 mb-1">Título Principal</label>
                        <Input
                            type="text"
                            id="heroTitulo"
                            placeholder="TEXTO EM DESTAQUE"
                            value={heroTitulo}
                            onChange={(e) => setHeroTitulo(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="heroSubtitulo" className="block text-sm font-medium text-gray-700 mb-1">Subtítulo</label>
                        <Input
                            type="text"
                            id="heroSubtitulo"
                            placeholder="subtitulo, descrição, data..."
                            value={heroSubtitulo}
                            onChange={(e) => setHeroSubtitulo(e.target.value)}
                        />
                    </div>
                    <ImageUploadPreview label="Imagem do Hero" imagemAtual={heroImagemAtual} onChange={setHeroImagem} />
                </div>
            </div>

            {/* Seção: Highlight */}
            <div className="border border-gray-200 rounded-[14px] overflow-hidden">
                <div className="px-5 py-3 bg-[#512B3C]">
                    <h2 className="text-white font-bold text-sm uppercase tracking-wider">Seção Fotos em Destaque</h2>
                </div>
                <div className="p-5 flex flex-col gap-4 bg-white">
                    <div>
                        <label htmlFor="highlightTitulo" className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                        <Input
                            type="text"
                            id="highlightTitulo"
                            placeholder="GRUPO DE FOTOS EM DESTAQUE"
                            value={highlightTitulo}
                            onChange={(e) => setHighlightTitulo(e.target.value)}
                        />
                    </div>
                    <ImageUploadPreview label="Imagem de Destaque" imagemAtual={highlightImagemAtual} onChange={setHighlightImagem} />
                </div>
            </div>

            {/* Seção: Cards */}
            <div className="border border-gray-200 rounded-[14px] overflow-hidden">
                <div className="px-5 py-3 bg-[#512B3C]">
                    <h2 className="text-white font-bold text-sm uppercase tracking-wider">Cards Inferiores</h2>
                </div>
                <div className="p-5 flex flex-col gap-6 bg-white">
                    {/* Card 1 */}
                    <div className="flex flex-col gap-3 pb-5 border-b border-gray-100">
                        <h3 className="font-semibold text-gray-600 text-sm">Card 1</h3>
                        <div>
                            <label htmlFor="card1Titulo" className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                            <Input
                                type="text"
                                id="card1Titulo"
                                placeholder="TEXTO EM DESTAQUE MENOR 1"
                                value={card1Titulo}
                                onChange={(e) => setCard1Titulo(e.target.value)}
                            />
                        </div>
                        <ImageUploadPreview label="Imagem Card 1" imagemAtual={card1ImagemAtual} onChange={setCard1Imagem} />
                    </div>
                    {/* Card 2 */}
                    <div className="flex flex-col gap-3">
                        <h3 className="font-semibold text-gray-600 text-sm">Card 2</h3>
                        <div>
                            <label htmlFor="card2Titulo" className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                            <Input
                                type="text"
                                id="card2Titulo"
                                placeholder="TEXTO EM DESTAQUE MENOR 2"
                                value={card2Titulo}
                                onChange={(e) => setCard2Titulo(e.target.value)}
                            />
                        </div>
                        <ImageUploadPreview label="Imagem Card 2" imagemAtual={card2ImagemAtual} onChange={setCard2Imagem} />
                    </div>
                </div>
            </div>

            <Button type="submit" disabled={saving}>
                {saving ? 'Salvando...' : 'Salvar Configurações'}
            </Button>
        </form>
    );
};

export default ConfiguracoesDashboard;
