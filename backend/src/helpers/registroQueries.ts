import sequelize from '../db/conn';

/**
 * helper para buscar todos os registros paginados cruzando as tabelas com UNION ALL
 * centraliza a lógica SQL crua fora do controller
 */
export const buscarTodosRegistrosPaginados = async (limit: number, offset: number) => {
    const dataQuery = `
        SELECT id, titulo, slug, thumb, galeria, descricao, NULL AS resumo, createdAt, updatedAt, 'texto' AS tipo
        FROM registros_textos
        UNION ALL
        SELECT id, titulo, slug, thumb, galeria, NULL AS descricao, resumo, createdAt, updatedAt, 'galeria' AS tipo
        FROM registros_galerias
        ORDER BY createdAt DESC
        LIMIT :limit OFFSET :offset
    `;

    const countQuery = `
        SELECT (
            (SELECT COUNT(*) FROM registros_textos) +
            (SELECT COUNT(*) FROM registros_galerias)
        ) AS total
    `;

    const [countResult]: any = await sequelize.query(countQuery);
    const total = parseInt(countResult[0]?.total || countResult[0]?.TOTAL) || 0;

    const [rows]: any = await sequelize.query(dataQuery, {
        replacements: { limit, offset }
    });

    return { total, registros: rows };
};
