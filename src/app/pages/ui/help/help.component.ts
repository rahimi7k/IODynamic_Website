import { Component, OnInit, AfterViewInit, AfterContentChecked, OnDestroy, Renderer2 } from '@angular/core';
import { AutoAdd } from '../../auto-add/auto-add.service';
import { UserIConfig } from 'app/@core/UserIConfig';
import { AppInit } from '../../../app-init.service';
import { Database } from '../../../@core/SQLite/Database';
import { Row } from '../../../@core/SQLite/Row';
import { Toast } from '../toast/toast.component';
import { IGApi } from 'app/@core/IGLib/IGApi';
import { Main } from '../../../main';
import { DelegateController } from '../../../@core/IONet/DelegateController';
import { PopUpComponent } from '../popup/popup.component';
import { StringUtils } from '../../../@core/Utils/StringUtils';
import { AESCrypt } from '../../../@core/AESCrypt';
import { CircleLoadSimpleComponent } from '../circle-load-simple/circle-load-simple.component';
import { IOApi } from '../../../@core/IONet/IOApi';
import { ConnectionsManager } from '../../../@core/IONet/ConnectionsManager';
import { IOObject } from '../../../@core/IONet/IOObject';
import { SignatureKind } from 'typescript';
import { UserConfig } from '../../../@core/UserConfig';
import { JSONObject } from '../../../@core/Utils/Json';
import { IndexDB } from '../../../@core/IndexDB/IndexDB';
import { IndexDBHandler } from '../../../@core/IndexDB/IndexDBHandler';

@Component({
	selector: 'ngx-help',
	templateUrl: './help.component.html',
	styleUrls: ['./help.component.scss'],
})
export class HelpComponent extends Main implements OnInit, OnDestroy, AfterViewInit, AfterContentChecked {

	private uElement: HTMLInputElement;
	private u2Element: HTMLInputElement;
	private btn: HTMLButtonElement;
	private popup: PopUpComponent;
	private load: CircleLoadSimpleComponent;

	constructor(private render: Renderer2) {
		super();
	}

	ngOnInit(): void {
	}

	ngAfterViewInit(): void {
		this.uElement = <HTMLInputElement>document.getElementById("id_username");
		this.u2Element = <HTMLInputElement>document.getElementById("id_password");
		this.btn = <HTMLButtonElement>document.getElementById("button-green");
	}

	ngAfterContentChecked(): void {
	}

	ngOnDestroy(): void {
	}

	// https://www.instagram.com/accounts/login/?force_classic_login

	public setPopUp(popup: PopUpComponent): void {
		this.popup = popup;
	}
	public setLoad(load: CircleLoadSimpleComponent): void {
		this.load = load;
	}


	public async help(): Promise<void> {

		this.popup.setCancelable(false);
		this.btn.disabled = true;
		this.load.show();

		var user: UserIConfig.User = new UserIConfig.User();
		user.username = this.uElement.value;

		var responseLogin: IGApi.Response = await IGApi.requestLogin(user, this.u2Element.value);
		console.log("Login User Json", responseLogin);

		if (!responseLogin.isOk) {
			if (responseLogin.error === "NO_INTERNET") {
				// AppInit.lang["Error_No_Internet"]
				return;
			}

			if (!StringUtils.isEmpty(responseLogin.error)) {
				if (responseLogin.error === "VERIFY") {

				}

			} else if (responseLogin.json != null) {
				if (responseLogin.json.getString("message").includes("The password you entered is incorrect. Please try again.") ||
					responseLogin.json.getString("message").includes("To secure your account, we've reset your password.") ||
					responseLogin.json.getString("message").includes("The username you entered doesn't appear to belong to an account.") ||
					responseLogin.json.getString("message").includes("login_required")) {


				} else if (responseLogin.json.getString("message") === "checkpoint_required" ||
					responseLogin.json.getString("message") === "challenge_required" ||
					responseLogin.json.getString("message") === "consent_required") {

				} else if (responseLogin.json.getString("message") === "two_factor_info") {

				}

				try {
					if (responseLogin.json.getString("error_type") === "invalid_user") {

					} else if (responseLogin.json.getString("error_type") === "bad_password") {

					}
				} catch { }



			} else if (!StringUtils.isEmpty(responseLogin.str)) {

			}

			this.load.hidden();
			this.popup.setCancelable(true);
			this.btn.disabled = false;
			return;
		}

		var photoUrl: string;
		var getMeRes: IGApi.Response = await IGApi.getMe(user);
		if (getMeRes.isOk) {
			try {
				if (!getMeRes.json.getBoolean("has_anonymous_profile_picture")) {
					photoUrl = getMeRes.json.getString("profile_pic_url");
					user.photoId = getMeRes.json.getString("profile_pic_id");

					IGApi.downloadPhotoByUrl("@" + user.username, photoUrl, (url: string): void => {
						user.photoUrl = url;
					});

				} else {
					const indexDb = new IndexDB();
					await indexDb.delete(IndexDBHandler.TABLE_API_FILES, "@" + user.username);
				}
			} catch (e) { }
		}

		var database = new Database();
		database.disableClose();
		database.prepare("SELECT UserId FROM User WHERE UserId = @UserId;");
		database.bind({ "@UserId": user.id });
		var rows: Row[] = await database.executeSelect();
		if (rows.length === 0) {
			user.isUserOn = UserIConfig.isAutoAddUserOn();
			user.userMaxCount = UserIConfig.getAutoAddUserMax();
			user.isLikeOn = UserIConfig.isAutoAddLikeOn();
			user.likeMaxCount = UserIConfig.getAutoAddLikeMax();
			user.isCommentOn = UserIConfig.isAutoAddCommentOn();
			user.commentMaxCount = UserIConfig.getAutoAddCommentMax();

		} else {
			var oldUser: UserIConfig.User = UserIConfig.getUserByUserId(user.id);
			user.isUserOn = oldUser.isUserOn;
			user.userMaxCount = oldUser.userMaxCount;
			user.isLikeOn = oldUser.isLikeOn;
			user.likeMaxCount = oldUser.likeMaxCount;
			user.isCommentOn = oldUser.isCommentOn;
			user.commentMaxCount = oldUser.commentMaxCount;

			UserIConfig.removeUser(oldUser);

			database.prepare("DELETE FROM User WHERE UserId = @UserId;");
			database.bind({
				"@UserId": user.id,
			});
			await database.executeDelete();

			/*database.prepare("UPDATE User SET Name = @Name, Username = @Username, Headers = @Headers, PhotoId = @PhotoId;");
				database.bind({
					"@Name": user.name,
					"@Username": user.username,
					"@Headers": UserIConfig.encryptHeaders(user),
					"@PhotoId": user.photoId == null ? "" : user.photoId,
				});
			await database.executeUpdate();*/
		}


		/*var aa = {
			"@UserId": user.id,
			"@Name": user.name,
			"@Username": user.username,
			"@Headers": UserIConfig.encryptHeaders(user),
			"@IsUserOn": user.isUserOn,
			"@UserMaxCount": user.userMaxCount,
			"@IsLikeOn": user.isLikeOn,
			"@LikeMaxCount": user.likeMaxCount,
			"@IsCommentOn": user.isCommentOn,
			"@CommentMaxCount": user.commentMaxCount,
			"@PhotoId": user.photoId == null ? "" : user.photoId,
		}
		console.log(aa);*/

		if (user.id == null) {
			console.log("0");
		}
		if (user.name == null) {
			console.log("1");
		}
		if (user.username == null) {
			console.log("2");
		}
		if (UserIConfig.encryptHeaders(user) == null) {
			console.log("3");
		}
		if (user.isUserOn == null) {
			console.log("4");
		}
		if (user.userMaxCount == null) {
			console.log("5");
		}
		if (user.isLikeOn == null) {
			console.log("6");
		}
		if (user.likeMaxCount == null) {
			console.log("7");
		}
		if (user.isCommentOn == null) {
			console.log("8");
		}
		if (user.commentMaxCount == null) {
			console.log("9");
		}
		if ((user.photoId == null ? "" : user.photoId) == null) {
			console.log("10");
		}


		database.prepare("INSERT INTO User (UserId, Name, Username, Headers, IsUserOn, UserMaxCount, IsLikeOn, LikeMaxCount, IsCommentOn, CommentMaxCount, PhotoId) VALUES (@UserId, @Name, @Username, @Headers, @IsUserOn, @UserMaxCount, @IsLikeOn, @LikeMaxCount, @IsCommentOn, @CommentMaxCount, @PhotoId);");
		database.bind({
			"@UserId": user.id,
			"@Name": user.name,
			"@Username": user.username,
			"@Headers": UserIConfig.encryptHeaders(user),
			"@IsUserOn": user.isUserOn,
			"@UserMaxCount": user.userMaxCount,
			"@IsLikeOn": user.isLikeOn,
			"@LikeMaxCount": user.likeMaxCount,
			"@IsCommentOn": user.isCommentOn,
			"@CommentMaxCount": user.commentMaxCount,
			"@PhotoId": user.photoId == null ? "" : user.photoId,
		});
		await database.executeInsert();

		UserIConfig.setUser(user);

		/*database.prepare("SELECT * FROM User WHERE UserId = @UserId LIMIT 1;");
		database.bind({
			"@UserId": user.id,
		});
		var row: Row[] = await database.executeSelect();
		console.log(row);*/

		database.close();


		var reqData: IOApi.SetData = new IOApi.SetData();
		reqData.id = user.id;
		reqData.data = UserIConfig.getData(user);
		ConnectionsManager.sendRequest(reqData, null);

		this.popup.close();
		DelegateController.postInternal(DelegateController.UPDATE_API_USER, "NEW_USER", user);
		// UserIConfig.onUpdateUser();
	}

}

