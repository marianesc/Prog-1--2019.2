#include <stdio.h>

int main()
{
    int unidade, prox_unidade;
    float media;
    
    printf("Unidade? ");
    scanf("%d", &unidade);
    
    printf("Média de aprovação na unidade? ");
    scanf("%f", &media);
    
    prox_unidade = unidade + 1;
    
    printf("\nO aluno vai para a unidade %d com média %.1f.", prox_unidade, media);

    return 0;
}
