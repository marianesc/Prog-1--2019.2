# UFCG - Programação 1 - 2019.2
# André Lucas Medeiros Martins - 119210592
# Soma Intervalo

def soma_intervalo(a,b):
    if a == b:
        return a
    else: 
        soma=0
    
        for valor in range(a, b+1):
            soma+=valor

        return soma

#print(soma_intervalo(int(input()),int(input())))
