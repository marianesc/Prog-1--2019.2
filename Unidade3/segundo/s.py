num1 = int(input())
num2 = int(input())
num3 = int(input())
num4 = int(input())

sM = sm = 0

if num1 > num2 and num1 > num3 and num1> num4:
	if num2 < num3 and num2 < num4:
		if num3 > num4:
			sm = num4
			sM = num3
		else:
			sm = num3
			sM = num4
	elif num3 < num2 and num3 < num4:
		if num2 > num4:
			sm = num4
			sM = num2
		else:
			sm = num2
			sM = num4
	elif num4 < num2 and num4 < num3:
		if num2 > num3:
			sm = num2
			sM = num3
		else:
			sm = num3
			sM = num2
elif num2 > num1 and num2 > num3 and num2 > num4:
	if num1 < num3 and num1 < num4:
		if num3 > num4:
			sm = num4
			sM = num3
		else:
			sm = num3
			sM = num4
	elif num3 < num1 and num3 < num4:
		if num1 > num4:
			sm = num4
			sM = num1
		else:
			sm = num1
			sM = num4
	elif num4 < num1 and num4 < num3:
		if num1 > num3:
			sm = num3
			sM = num1
		else:
			sm = num1
			sM = num3
elif num3 > num1 and num3 > num2 and num3 > num4:
	if num1 < num2 and num1 < num4:
		if num2 > num4:
			sm = num4
			sM = num2
		else:
			sm = num2
			sM = num4
	elif num2 < num1 and num2 < num4:
		if num1 > num4:
			sm = num4
			sM = num1
		else:
			sm = num1
			sM = num4
	elif num4 < num1 and num4 < num2:
		if num1 > num2:
			sm = num2
			sM = num1
		else:
			sm = num1
			sM = num2
elif num4 > num1 and num4 > num2 and num4 > num3:
	if num1 < num3 and num1 < num2:
		if num2 > num3:
			sm = num3
			sM = num2
		else:
			sm = num2
			sM = num3
	elif num3 < num1 and num3 < num2:
		if num1 > num2:
			sm = num2
			sM = num1
		else:
			sm = num1
			sM = num2
	elif num2 < num1 and num2 < num3:
		if num1 > num3:
			sm = num3
			sM = num1
		else:
			sm = num1
			sM = num3

print('Considerando os números {}, {}, {} e {}'.format(num1, num2, num3, num4))
print('O segundo menor número é {}'.format(sm))
print('O segundo maior número é {}'.format(sM))
