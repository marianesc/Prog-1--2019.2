#include <stdio.h>
#include <locale.h>

int main()
{
    setlocale(LC_ALL, "portuguese");
    
    float reais, cotacao;
    
    printf("Reais? ");
    scanf("%f", &reais);
    printf("Cotação? ");
    scanf("%f", &cotacao);
    
    printf("Conversão: $%.2f", reais * cotacao);
    
    return 0;
}
