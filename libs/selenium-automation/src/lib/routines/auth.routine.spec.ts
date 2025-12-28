import { WebDriver, WebElement } from 'selenium-webdriver';
import { AuthRoutine, LoginCredentials } from './auth.routine';

describe('AuthRoutine', () => {
  let mockDriver: jest.Mocked<WebDriver>;
  let mockElement: jest.Mocked<WebElement>;
  let authRoutine: AuthRoutine;

  beforeEach(() => {
    // Create mock WebElement
    mockElement = {
      clear: jest.fn().mockResolvedValue(undefined),
      sendKeys: jest.fn().mockResolvedValue(undefined),
      click: jest.fn().mockResolvedValue(undefined),
      isDisplayed: jest.fn().mockResolvedValue(true),
    } as unknown as jest.Mocked<WebElement>;

    // Create mock WebDriver
    mockDriver = {
      get: jest.fn().mockResolvedValue(undefined),
      wait: jest.fn().mockResolvedValue(mockElement),
      findElement: jest.fn().mockResolvedValue(mockElement),
      findElements: jest.fn().mockResolvedValue([]),
      getCurrentUrl: jest.fn().mockResolvedValue('https://www.ea.com/fifa/ultimate-team/web-app/'),
      manage: jest.fn().mockReturnValue({
        getCookies: jest.fn().mockResolvedValue([]),
        addCookie: jest.fn().mockResolvedValue(undefined),
      }),
      executeScript: jest.fn().mockResolvedValue({}),
      quit: jest.fn().mockResolvedValue(undefined),
    } as unknown as jest.Mocked<WebDriver>;

    authRoutine = new AuthRoutine(mockDriver);
  });

  describe('navigateToLogin', () => {
    it('should navigate to the default EA FC login URL', async () => {
      await authRoutine.navigateToLogin();

      expect(mockDriver.get).toHaveBeenCalledWith('https://www.ea.com/fifa/ultimate-team/web-app/');
    });

    it('should navigate to a custom URL when provided', async () => {
      const customUrl = 'https://custom.ea.com/login';
      await authRoutine.navigateToLogin(customUrl);

      expect(mockDriver.get).toHaveBeenCalledWith(customUrl);
    });
  });

  describe('login', () => {
    it('should fill in credentials and submit the form', async () => {
      const credentials: LoginCredentials = {
        email: 'test@example.com',
        password: 'password123',
      };

      await authRoutine.login(credentials);

      expect(mockElement.clear).toHaveBeenCalledTimes(2);
      expect(mockElement.sendKeys).toHaveBeenCalledWith(credentials.email);
      expect(mockElement.sendKeys).toHaveBeenCalledWith(credentials.password);
      expect(mockElement.click).toHaveBeenCalledTimes(1);
    });
  });

  describe('extractSessionData', () => {
    it('should extract cookies, localStorage, and sessionStorage', async () => {
      const mockCookies = [{ name: 'session', value: 'abc123', domain: '.ea.com', path: '/' }];
      const mockLocalStorage = { token: 'xyz789' };
      const mockSessionStorage = { tempData: 'temp123' };

      (mockDriver.manage as jest.Mock).mockReturnValue({
        getCookies: jest.fn().mockResolvedValue(mockCookies),
      });
      (mockDriver.executeScript as jest.Mock)
        .mockResolvedValueOnce(mockLocalStorage)
        .mockResolvedValueOnce(mockSessionStorage);

      const sessionData = await authRoutine.extractSessionData();

      expect(sessionData.cookies).toHaveLength(1);
      expect(sessionData.cookies[0].name).toBe('session');
      expect(sessionData.localStorage).toEqual(mockLocalStorage);
      expect(sessionData.sessionStorage).toEqual(mockSessionStorage);
    });
  });

  describe('verifyLoginSuccess', () => {
    it('should return true when navigation element is found', async () => {
      const result = await authRoutine.verifyLoginSuccess();

      expect(result).toBe(true);
    });

    it('should return false when navigation element is not found', async () => {
      (mockDriver.wait as jest.Mock).mockRejectedValueOnce(
        new Error('Timeout waiting for element')
      );

      const result = await authRoutine.verifyLoginSuccess();

      expect(result).toBe(false);
    });
  });
});
