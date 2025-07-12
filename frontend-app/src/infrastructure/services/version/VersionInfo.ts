export class VersionInfo {
  name: string;
  version: string;
  build: string;
  commit: string;
  description: string;
  environment: string;
  flutterVersion: string;

  constructor(data: {
    name: string;
    version: string;
    build: string;
    commit: string;
    description: string;
    environment: string;
    flutterVersion: string;
  }) {
    this.name = data.name;
    this.version = data.version;
    this.build = data.build;
    this.commit = data.commit;
    this.description = data.description;
    this.environment = data.environment;
    this.flutterVersion = data.flutterVersion;
  }

  static fromJson(json: any): VersionInfo {
    return new VersionInfo({
      name: json.name,
      version: json.version,
      build: json.build,
      commit: json.commit,
      description: json.description,
      environment: json.environment,
      flutterVersion: json.flutter_version,
    });
  }
}
