//este arquivo é o formulário administrativo para gerenciar visualmente os textos e mídias da homepage do sistema.
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Input from '../../components/formulario/Input';
import Button from '../../components/formulario/Button';
import useFlashMessage from '../../hooks/useFlashMessage';
import api from '../../services/api';
import ImageUploadPreview from '../../components/admin/ImageUploadPreview';

const dashboardSchema = z.object({
    heroTitulo: z.string(),
    heroSubtitulo: z.string(),
    highlightTitulo: z.string(),
    card1Titulo: z.string(),
    card2Titulo: z.string(),
});

type DashboardTexts = z.infer<typeof dashboardSchema>;


interface DashboardConfigData {
    heroTitulo: string;
    heroSubtitulo: string;
    heroImagem: string[] | null;
    highlightTitulo: string;
    highlightImagem: string[] | null;
    card1Titulo: string;
    card1Imagem: string[] | null;
    card2Titulo: string;
    card2Imagem: string[] | null;
}

const ConfiguracoesDashboard: React.FC = () => {
    const { setFlashMessage } = useFlashMessage();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const { register, handleSubmit: rhfSubmit, reset } = useForm<DashboardTexts>({
        resolver: zodResolver(dashboardSchema),
        defaultValues: {
            heroTitulo: '',
            heroSubtitulo: '',
            highlightTitulo: '',
            card1Titulo: '',
            card2Titulo: '',
        }
    });

    //arquivos de imagem localmente segurados para envio (arrays de Blobs)
    const [heroImagem, setHeroImagem] = useState<Blob[]>([]);
    const [highlightImagem, setHighlightImagem] = useState<Blob[]>([]);
    const [card1Imagem, setCard1Imagem] = useState<Blob[]>([]);
    const [card2Imagem, setCard2Imagem] = useState<Blob[]>([]);

    //previews das imagens já salvas no db (arrays de strings vindas do json)
    const [heroImagemAtual, setHeroImagemAtual] = useState<string[]>([]);
    const [highlightImagemAtual, setHighlightImagemAtual] = useState<string[]>([]);
    const [card1ImagemAtual, setCard1ImagemAtual] = useState<string[]>([]);
    const [card2ImagemAtual, setCard2ImagemAtual] = useState<string[]>([]);

    //busca as configurações atuais da api assim que entrar na aba administrativa
    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const resposta = await api.get('/dashboard-config');
                const dados: DashboardConfigData = resposta.data;
                
                reset({
                    heroTitulo: dados.heroTitulo || '',
                    heroSubtitulo: dados.heroSubtitulo || '',
                    highlightTitulo: dados.highlightTitulo || '',
                    card1Titulo: dados.card1Titulo || '',
                    card2Titulo: dados.card2Titulo || '',
                });

                setHeroImagemAtual(dados.heroImagem ? (typeof dados.heroImagem === 'string' ? JSON.parse(dados.heroImagem) : dados.heroImagem) : []);
                setHighlightImagemAtual(dados.highlightImagem ? (typeof dados.highlightImagem === 'string' ? JSON.parse(dados.highlightImagem) : dados.highlightImagem) : []);
                setCard1ImagemAtual(dados.card1Imagem ? (typeof dados.card1Imagem === 'string' ? JSON.parse(dados.card1Imagem) : dados.card1Imagem) : []);
                setCard2ImagemAtual(dados.card2Imagem ? (typeof dados.card2Imagem === 'string' ? JSON.parse(dados.card2Imagem) : dados.card2Imagem) : []);
            } catch (error) {
                console.error('Erro ao buscar configurações:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchConfig();
    }, [reset]);

    const onSubmit = async (data: DashboardTexts) => {
        setSaving(true);

        try {
            const formData = new FormData();
            formData.append('heroTitulo', data.heroTitulo);
            formData.append('heroSubtitulo', data.heroSubtitulo);
            formData.append('highlightTitulo', data.highlightTitulo);
            formData.append('card1Titulo', data.card1Titulo);
            formData.append('card2Titulo', data.card2Titulo);

            heroImagem.forEach((b, i) => formData.append('heroImagem', b, `hero-${i}.jpg`));
            highlightImagem.forEach((b, i) => formData.append('highlightImagem', b, `highlight-${i}.jpg`));
            card1Imagem.forEach((b, i) => formData.append('card1Imagem', b, `card1-${i}.jpg`));
            card2Imagem.forEach((b, i) => formData.append('card2Imagem', b, `card2-${i}.jpg`));

            const resposta = await api.put('/dashboard-config', formData);
            const dadosRes = resposta.data;

            setFlashMessage('Configurações salvas com sucesso!', 'success');

            if (heroImagem.length > 0) setHeroImagemAtual(dadosRes.config?.heroImagem || []);
            if (highlightImagem.length > 0) setHighlightImagemAtual(dadosRes.config?.highlightImagem || []);
            if (card1Imagem.length > 0) setCard1ImagemAtual(dadosRes.config?.card1Imagem || []);
            if (card2Imagem.length > 0) setCard2ImagemAtual(dadosRes.config?.card2Imagem || []);

            // limpa os inputs de arquivo após o sucesso
            setHeroImagem([]);
            setHighlightImagem([]);
            setCard1Imagem([]);
            setCard2Imagem([]);

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
        <form onSubmit={rhfSubmit(onSubmit)} className="flex flex-col gap-6">

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
                            {...register('heroTitulo')}
                        />
                    </div>
                    <div>
                        <label htmlFor="heroSubtitulo" className="block text-sm font-medium text-gray-700 mb-1">Subtítulo</label>
                        <Input
                            type="text"
                            id="heroSubtitulo"
                            placeholder="subtitulo, descrição, data..."
                            {...register('heroSubtitulo')}
                        />
                    </div>
                    <ImageUploadPreview label="Imagem do Hero" imagensSalvas={heroImagemAtual} arquivosNovos={heroImagem} onChangeNovos={setHeroImagem} />
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
                            {...register('highlightTitulo')}
                        />
                    </div>
                    <ImageUploadPreview label="Imagem de Destaque" imagensSalvas={highlightImagemAtual} arquivosNovos={highlightImagem} onChangeNovos={setHighlightImagem} />
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
                                {...register('card1Titulo')}
                            />
                        </div>
                        <ImageUploadPreview label="Imagem Card 1" imagensSalvas={card1ImagemAtual} arquivosNovos={card1Imagem} onChangeNovos={setCard1Imagem} />
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
                                {...register('card2Titulo')}
                            />
                        </div>
                        <ImageUploadPreview label="Imagem Card 2" imagensSalvas={card2ImagemAtual} arquivosNovos={card2Imagem} onChangeNovos={setCard2Imagem} />
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
