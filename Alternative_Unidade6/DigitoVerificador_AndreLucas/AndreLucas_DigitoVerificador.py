# UFCG - Programação 1 - 2019.2
# André Lucas Medeiros Martins - 119210592
# Digitos de Verificação do CPF

def calcula_digitos_verificacao(CPF):
    verificadores = ''

    for vez in range(2):
        multiplicador = 2
        acumulador = 0
        
        for indice in range(len(CPF)-1, -1, -1):
            acumulador += int(CPF[indice]) * multiplicador
            multiplicador += 1
            
        acumulador = (acumulador * 10)%11
        if acumulador == 10:
            acumulador = 0

        CPF += str(acumulador)

        verificadores += str(acumulador)

    return verificadores

#print(calcula_digitos_verificacao(input()))
