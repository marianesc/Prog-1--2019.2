import unittest
import sys

undertest = __import__(sys.argv[-1].split(".py")[0])
conta_alertas_acude = getattr(undertest, 'conta_alertas_acude', None)

class PublicTests(unittest.TestCase):

    def test_exemplo(self):
        medicoes = [50,50,50,23,21,17,15,60,65,15,15]
        assert conta_alertas_acude(medicoes) == 2

if __name__ == '__main__':
    loader = unittest.TestLoader()
    runner = unittest.TextTestRunner()
    runner.run(loader.loadTestsFromModule(sys.modules[__name__]))
