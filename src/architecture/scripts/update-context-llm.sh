#!/bin/bash

# Nome do arquivo de saída
OUTPUT_FILE="project-for-llm.txt"

# Diretório base do projeto (substitua "." pelo caminho do seu projeto, se necessário)
BASE_DIR="."

# Diretórios e arquivos que devem ser ignorados
IGNORE_PATHS=(".angular" "dist" "public" "node_modules" ".git")
IGNORE_FILES=("README.md" "package-lock.json" ".gitignore" "atualizar-base-conhecimento.sh" ".editorconfig")

# Limpa o arquivo de saída se já existir
> "$OUTPUT_FILE"

# Função para verificar se o caminho deve ser ignorado (pastas ou arquivos)
should_ignore() {
    local path="$1"

    # Verifica se o caminho contém algum diretório ignorado
    for ignore in "${IGNORE_PATHS[@]}"; do
        if [[ "$path" == *"$ignore"* ]]; then
            return 0
        fi
    done

    # Verifica se o arquivo em si deve ser ignorado
    local filename
    filename=$(basename "$path")
    for ignore_file in "${IGNORE_FILES[@]}"; do
        if [[ "$filename" == "$ignore_file" ]]; then
            return 0
        fi
    done

    return 1
}

echo '''
Abaixo todo os arquivos e suas respectivas pastas, 
por favor recomende todas as partes de código envolvendo 
qual PATH devo atualizar e sempre utilizando boas práticas de 
DDD, Solid e Orientação a objeto
''' >> "$OUTPUT_FILE"

# Calcula o total de arquivos a serem processados
echo "Calculando o total de arquivos..."
TOTAL_FILES=$(find "$BASE_DIR" -type f \
    $(for ignore in "${IGNORE_PATHS[@]}"; do echo -n "-not -path \"*/$ignore/*\" "; done) \
    $(for ignore_file in "${IGNORE_FILES[@]}"; do echo -n "-not -name \"$ignore_file\" "; done) \
    -not -name "$OUTPUT_FILE" | wc -l)

echo "Total de arquivos a processar: $TOTAL_FILES"

# Variável para rastrear progresso
PROCESSED_FILES=0

# Percorre todos os arquivos recursivamente no diretório base
while IFS= read -r -d '' file; do
    # Pula arquivos ou pastas ignorados
    if should_ignore "$file"; then
        continue
    fi

    # Incrementa a contagem de arquivos processados
    ((PROCESSED_FILES++))

    # Calcula a porcentagem de progresso
    PROGRESS=$(awk "BEGIN {printf \"%.2f\", ($PROCESSED_FILES / $TOTAL_FILES) * 100}")

    # Exibe o progresso atual
    echo "Documentando código..."

    # Adiciona o cabeçalho com o caminho do arquivo no documento
    echo "Arquivo: $file" >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"

    # Adiciona o conteúdo do arquivo ao documento
    cat "$file" >> "$OUTPUT_FILE"
    echo -e "\n\n---\n\n" >> "$OUTPUT_FILE" # Separador entre arquivos
done < <(find "$BASE_DIR" -type f \
    $(for ignore in "${IGNORE_PATHS[@]}"; do echo -n "-not -path \"*/$ignore/*\" "; done) \
    $(for ignore_file in "${IGNORE_FILES[@]}"; do echo -n "-not -name \"$ignore_file\" "; done) \
    -not -name "$OUTPUT_FILE" \
    -print0)

echo "Conteúdo dos arquivos foi salvo em '$OUTPUT_FILE'."
