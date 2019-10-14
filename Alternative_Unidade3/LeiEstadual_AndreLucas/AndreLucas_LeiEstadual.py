# UFCG - Programação 1 - 2019.2
# ANdré Lucas Medeiros Martins - 119210592
# Lei Estadual

idade = int(input("Idade? "))

if idade < 12: 
    print('criança (meia entrada)')

elif idade >= 65:
    print("idoso (meia entrada)")

else:
    estudante = input('Estudante? ')
    
    if estudante == 's':
        redePublica = input("Rede Pública? ")
        
        if redePublica == 's':
            print("estudante da rede pública (isento)")
        
        else:
            print("estudante (meia entrada)")

    else:
        print("adulto (inteira)")
    
