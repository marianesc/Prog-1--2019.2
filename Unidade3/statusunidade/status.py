#UFCG
#Programação 1 - 2019.2
#Juan Salvador da Silva -119210821
#Status unidade

mtps = int(input())

if mtps == 1:
    nota1 = float(input())
    print(nota1)
    print("Aluno ainda não aprovado na unidade")
elif mtps == 2:
    nota1 = float(input())
    nota2 = float(input())
    media = (nota1+nota2)/2
    print(media)
    if media < 6:
        print("Aluno ainda não aprovado na unidade")
    else:
        print("Aluno aprovado na unidade")
elif mtps == 3:
    nota1 = float(input())
    nota2 = float(input())
    nota3 = float(input())
    media = ((nota1+nota2+nota3)/3)-0.5
    print(media)
    if media < 6:
        print("Aluno ainda não aprovado na unidade")
    else:
        print("Aluno aprovado na unidade")
elif mtps == 4:
    nota1 = float(input())
    nota2 = float(input())
    nota3 = float(input())
    nota4 = float(input())
    media =((nota1+nota2+nota3+nota4)/4)-0.5
    if media <6:
        print("Aluno ainda não aprovado na unidade")
    else:
        print("Aluno aprovado na unidade") 
