import { NavigationProp } from '@react-navigation/native';

export class NavigationHelper {
  static goTo(navigation: NavigationProp<any>, route: string, params: any = {}): void {
    navigation.navigate(route as never, params as never);
  }

  static goBack(navigation: NavigationProp<any>): void {
    navigation.goBack();
  }

  static goReplace(navigation: NavigationProp<any>, route: string, params: any = {}): void {
    navigation.reset({
      index: 0,
      routes: [{ name: route, params }],
    });
  }
}
