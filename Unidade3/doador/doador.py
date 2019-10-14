#UFCG
#Programação 1 - 2019.2
#Juan Salvador da Silva -119210821
#Compatibilidade Sanguínea

tipo1 = input()
rh1 = input()
tipo2 = input()
rh2 = input()

if tipo1 == 'A' :
    if tipo2 != 'B'and tipo2 != 'AB':
        if rh1 =='-' and rh2 == '+':
            print ("incompatível")
        else:
            print("compatível")
    else:
        print("incompatível")
elif tipo1 == 'B' :
    if tipo2 != 'A' and tipo2 != 'AB':
        if rh1 =='-' and rh2 == '+':
            print ("incompatível")
        else:
            print("compatível")
    else:
        print("incompatível")
elif tipo1 == 'AB': 
    if rh1 =='-' and rh2 == '+':
        print ("incompatível")
    else:
        print("compatível")
elif tipo1 == 'O': 
    if tipo2 == 'O':
        if rh1 =='-' and rh2 == '+':
            print ("incompatível")
        else:
            print("compatível")
    else:
        print("incompatível")
