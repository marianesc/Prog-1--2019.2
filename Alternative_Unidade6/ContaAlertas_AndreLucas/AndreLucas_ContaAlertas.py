# UFCG - Programação 1 - 2019.2
# André Lucas Mederios Martins - 119210592
# Conta Alertas

def conta_alertas_acude(medicoes):
    alertas = 0
    
    for indice in range(len(medicoes)):
        diferenca = medicoes[indice] - medicoes[indice - 1]
        
        if diferenca < 0:
            diferenca *= -1
        
        if diferenca < 10:
            if medicoes[indice] < 17:
                alertas += 1

    return alertas

#print(conta_alertas_acude(list(map(int,input().split()))))
