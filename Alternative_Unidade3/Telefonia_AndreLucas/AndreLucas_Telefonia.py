# UFCG - Programação 1 - 2019.2
# André Lucas Mederios Martins - 119210592
# Telefonia

minutos = int(input())

taxa_ligacao = 1

if minutos <= 3:
    taxa_ligacao += minutos * 0.50
else:
    minutos -= 3
    taxa_ligacao += 1.50

    if minutos >= 5:
        taxa_ligacao += minutos//5 * 3
        minutos -= minutos//5 * 5
    
    if minutos >= 1:
        taxa_ligacao += minutos*0.70

print('R$ {:.2f}'.format(taxa_ligacao))

